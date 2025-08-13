import { describe, it, expect } from 'vitest';
import { leadSchema, buildLeadPayload } from '../src/lib/lead';

describe('leadSchema', () => {
  it('requires valid fields', () => {
    const result = leadSchema.safeParse({ name: '', phoneNumber: '', email: 'bad' });
    expect(result.success).toBe(false);
  });
  it('accepts valid input', () => {
    const result = leadSchema.safeParse({ name: 'A', phoneNumber: '123', email: 'a@b.com' });
    expect(result.success).toBe(true);
  });
});

describe('buildLeadPayload', () => {
  it('normalizes data', () => {
    const payload = buildLeadPayload({ name: ' Test ', phoneNumber: '(469) 458-6966', email: 'USER@EXAMPLE.COM' });
    expect(payload.name).toBe('Test');
    expect(payload.phoneNumber).toBe('4694586966');
    expect(payload.email).toBe('user@example.com');
  });
});
