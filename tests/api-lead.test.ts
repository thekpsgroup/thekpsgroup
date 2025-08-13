import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs/promises';
import { POST } from '../src/pages/api/lead';

const goodBody = { name: 'A', phoneNumber: '123', email: 'a@b.com' };

describe('api lead', () => {
  beforeEach(async () => {
    vi.restoreAllMocks();
    await fs.writeFile('lead-queue.json', '[]').catch(() => {});
  });

  it('returns 200 on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ id: '1' }),
    } as any);
    const res = await POST({ request: new Request('http://test', { method: 'POST', body: JSON.stringify(goodBody) }) } as any);
    expect(res.status).toBe(200);
  });

  it('validates input', async () => {
    const res = await POST({ request: new Request('http://test', { method: 'POST', body: '{}' }) } as any);
    expect(res.status).toBe(400);
  });

  it('queues on failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('fail'));
    const res = await POST({ request: new Request('http://test', { method: 'POST', body: JSON.stringify(goodBody) }) } as any);
    expect(res.status).toBe(202);
  });
});
