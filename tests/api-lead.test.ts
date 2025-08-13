import { describe, it, expect, beforeEach, vi } from 'vitest';
import nodemailer from 'nodemailer';
import { POST } from '../src/pages/api/lead';

const goodBody = { brandKey: 'kps', name: 'A', phone: '123', email: 'a@b.com' };

describe('api lead', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.SMTP_HOST = 'smtp.test';
    process.env.SMTP_USER = 'user';
    process.env.SMTP_PASS = 'pass';
  });

  it('returns 200 on success', async () => {
    vi.spyOn(nodemailer, 'createTransport').mockReturnValue({
      sendMail: vi.fn().mockResolvedValue(undefined),
    } as any);
    const req = new Request('http://test', { method: 'POST', body: JSON.stringify(goodBody), headers: { origin: 'https://thekpsgroup.com' } });
    const res = await POST({ request: req } as any);
    expect(res.status).toBe(200);
  });

  it('validates input', async () => {
    const req = new Request('http://test', { method: 'POST', body: '{}', headers: { origin: 'https://thekpsgroup.com' } });
    const res = await POST({ request: req } as any);
    expect(res.status).toBe(400);
  });
});
