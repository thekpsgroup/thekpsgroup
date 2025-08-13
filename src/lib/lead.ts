import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  phoneNumber: z.string().trim().min(1, 'Phone number is required'),
  email: z.string().trim().email('Invalid email'),
  services: z.string().trim().optional(),
  company: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  telemetry: z
    .object({
      ip: z.string().optional(),
      ua: z.string().optional(),
      timestamp: z.string().optional(),
      page: z.string().optional(),
      referrer: z.string().optional(),
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_term: z.string().optional(),
      utm_content: z.string().optional(),
    })
    .optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function buildLeadPayload(input: LeadInput) {
  const payload = {
    name: input.name.trim(),
    phoneNumber: input.phoneNumber.replace(/[^+\d]/g, ''),
    email: input.email.trim().toLowerCase(),
    services: input.services?.trim(),
    company: input.company?.trim(),
    notes: input.notes?.trim(),
    telemetry: {
      ...input.telemetry,
      timestamp: input.telemetry?.timestamp || new Date().toISOString(),
    },
  };
  return payload;
}

export async function submitLead(data: LeadInput) {
  const payload = buildLeadPayload(data);
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { ok: false, error: err.error || 'server_error' } as const;
    }
    const json = await res.json().catch(() => ({}));
    return { ok: true, id: json.id } as const;
  } catch (e) {
    return { ok: false, error: 'network_error' } as const;
  }
}
