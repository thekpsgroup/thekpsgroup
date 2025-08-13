import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { BRANDS, ALLOWED_ORIGINS } from '../../lib/brands';

const RATE_LIMIT = 10; // per IP per hour
const bucket = new Map<string, { count: number; reset: number }>();

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
  } as Record<string, string>;
}

export const OPTIONS: APIRoute = async ({ request }) => {
  const origin = request.headers.get('origin') || '';
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : '';
  return new Response(null, { status: 204, headers: corsHeaders(allow) });
};

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get('origin') || '';
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : '';
  if (!allow) return new Response('Forbidden origin', { status: 403 });

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const entry = bucket.get(ip) || { count: 0, reset: now + 60 * 60 * 1000 };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 60 * 60 * 1000; }
  if (++entry.count > RATE_LIMIT) {
    return new Response('Rate limit', { status: 429, headers: corsHeaders(allow) });
  }
  bucket.set(ip, entry);

  const payload = await request.json().catch(() => null);
  if (!payload) return new Response('Invalid JSON', { status: 400, headers: corsHeaders(allow) });

  const { brandKey, name, company, email, phone, employees, service, message, website } = payload as Record<string, string>;

  if (website) return new Response('OK', { status: 200, headers: corsHeaders(allow) });

  if (!brandKey || !(brandKey in BRANDS)) return new Response('Unknown brand', { status: 400, headers: corsHeaders(allow) });
  if (!name || !email || !phone) return new Response('Missing fields', { status: 400, headers: corsHeaders(allow) });

  const brand = BRANDS[brandKey as keyof typeof BRANDS];

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });

  const subject = `[${brand.name} Lead] ${name} – ${service || 'inquiry'}`;
  const html = `
    <h2>New Lead for ${brand.name}</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Company:</b> ${company || '-'}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Employees:</b> ${employees || '-'}</p>
    <p><b>Service:</b> ${service || '-'}</p>
    <p><b>Message:</b><br/>${(message || '').replace(/\n/g, '<br/>')}</p>
    <hr/>
    <p><small>Origin: ${origin}</small></p>
  `;

  try {
    await transporter.sendMail({
      from: `Leads <no-reply@thekpsgroup.com>`,
      to: brand.email,
      subject,
      html,
    });
  } catch (e) {
    console.error('Email failed:', e);
    try {
      const fs = await import('fs/promises');
      await fs.appendFile('/tmp/lead-fallback.log', JSON.stringify({ at: new Date().toISOString(), brand: brandKey, payload }) + "\n");
    } catch {}
    return new Response('Delivery issue', { status: 202, headers: corsHeaders(allow) });
  }

  if (brandKey === 'kps' && process.env.ROUTER_ENDPOINT && process.env.ROUTER_API_KEY) {
    try {
      await fetch(process.env.ROUTER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ROUTER_API_KEY!,
        },
        body: JSON.stringify({ Name: name, "Phone Number": phone, Email: email, "Service(s) interested in?)": service || 'N/A' }),
      });
    } catch (e) {
      console.warn('Router.so forward failed:', e);
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(allow) },
  });
};
