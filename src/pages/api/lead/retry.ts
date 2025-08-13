import type { APIRoute } from 'astro';
import fs from 'fs/promises';

const ROUTER_ENDPOINT = 'https://app.router.so/api/endpoints/wfk5gdct';
const QUEUE_PATH = './lead-queue.json';

async function postToRouter(payload: any) {
  const res = await fetch(ROUTER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.ROUTER_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('router');
  return await res.json();
}

export const POST: APIRoute = async ({ request }) => {
  const auth = request.headers.get('authorization');
  if (!auth || auth !== `Bearer ${import.meta.env.RETRY_TOKEN}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  const queue = JSON.parse(await fs.readFile(QUEUE_PATH, 'utf-8').catch(() => '[]')) as any[];
  const remaining: any[] = [];
  for (const item of queue) {
    try {
      await postToRouter(item);
    } catch {
      remaining.push(item);
    }
  }
  await fs.writeFile(QUEUE_PATH, JSON.stringify(remaining));
  return new Response(JSON.stringify({ ok: true, remaining: remaining.length }), { status: 200 });
};
