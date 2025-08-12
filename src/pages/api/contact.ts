import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const RATE_LIMIT: Record<string, { time: number; count: number }> = {};

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for') || 'local';
  const now = Date.now();
  const windowMs = 60_000; // 1 minute window
  const limit = 5;
  const record = RATE_LIMIT[ip];
  if (!record || now - record.time > windowMs) {
    RATE_LIMIT[ip] = { time: now, count: 1 };
  } else {
    record.count += 1;
    if (record.count > limit) {
      return new Response('Too many requests', { status: 429 });
    }
  }

  const form = await request.formData();
  const name = form.get('name')?.toString().trim() || '';
  const email = form.get('email')?.toString().trim() || '';
  const phone = form.get('phone')?.toString().trim() || '';
  const message = form.get('message')?.toString().trim() || '';
  const honeypot = form.get('company_website')?.toString().trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (honeypot || !emailRegex.test(email) || message.length < 20) {
    return Response.redirect('/contact?error=1', 303);
  }

  const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;

  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'web@thekpsgroup.com',
        to: process.env.EMAIL_TO || 'sales@thekpsgroup.com',
        subject: 'New website inquiry - The KPS Group',
        text,
      });
    } else {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'web@thekpsgroup.com',
        to: process.env.EMAIL_TO || 'sales@thekpsgroup.com',
        subject: 'New website inquiry - The KPS Group',
        text,
      });
    }
    return Response.redirect('/thank-you', 303);
  } catch (e) {
    return Response.redirect('/contact?error=1', 303);
  }
};
