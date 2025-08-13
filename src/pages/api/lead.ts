import type { APIRoute } from 'astro';
import { leadSchema, buildLeadPayload } from '../../lib/lead';
import fs from 'fs/promises';

const ROUTER_ENDPOINT = 'https://app.router.so/api/endpoints/wfk5gdct';
const QUEUE_PATH = './lead-queue.json';

async function queueLead(payload: any) {
  try {
    const existing = JSON.parse(await fs.readFile(QUEUE_PATH, 'utf-8').catch(() => '[]')) as any[];
    existing.push(payload);
    await fs.writeFile(QUEUE_PATH, JSON.stringify(existing));
  } catch {}
}

async function postToRouter(payload: any) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(ROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.ROUTER_API_KEY}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('router');
    return await res.json();
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

export const POST: APIRoute = async ({ request }) => {
  let data: any;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400 });
  }
  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'validation_error' }), { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ua = request.headers.get('user-agent') || undefined;
  const ref = request.headers.get('referer') || undefined;

  const payload = buildLeadPayload({
    ...parsed.data,
    telemetry: {
      ...parsed.data.telemetry,
      ip,
      ua,
      referrer: parsed.data.telemetry?.referrer || ref,
      page: parsed.data.telemetry?.page || ref,
    },
  });

  try {
    const result = await postToRouter(payload);
    return new Response(JSON.stringify({ ok: true, id: result.id }), { status: 200 });
  } catch (e) {
    await queueLead(payload);
    return new Response(JSON.stringify({ ok: false, error: 'queued' }), { status: 202 });
  }
};
