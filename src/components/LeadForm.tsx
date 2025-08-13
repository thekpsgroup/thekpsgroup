import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { leadSchema, submitLead } from '../lib/lead';
import type { LeadInput } from '../lib/lead';

interface Props {
  formId?: string;
}

export default function LeadForm({ formId = 'lead' }: Props) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    services: '',
    company: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [lastSubmit, setLastSubmit] = useState(0);

  function update(field: string, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function validate() {
    const res = leadSchema.safeParse(values as any);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => {
        if (i.path[0]) errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return null;
    }
    setErrors({});
    return res.data;
  }

  async function flushQueue() {
    const queue = JSON.parse(localStorage.getItem('leadQueue') || '[]');
    if (queue.length === 0) return;
    const remaining: any[] = [];
    for (const item of queue) {
      const res = await submitLead(item as LeadInput);
      if (!res.ok) remaining.push(item);
    }
    localStorage.setItem('leadQueue', JSON.stringify(remaining));
  }

  useEffect(() => {
    flushQueue();
    window.addEventListener('online', flushQueue);
    window.addEventListener('focus', flushQueue);
    return () => {
      window.removeEventListener('online', flushQueue);
      window.removeEventListener('focus', flushQueue);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (Date.now() - lastSubmit < 10000) return; // throttle
    const data = validate();
    if (!data) {
      document.dispatchEvent(
        new CustomEvent('form_submit_error', {
          detail: { form_id: formId, page: location.pathname, error_code: 'validation' },
        })
      );
      return;
    }
    if ((values as any).hp) {
      return; // honeypot filled
    }
    setStatus('loading');
    setLastSubmit(Date.now());
    document.dispatchEvent(
      new CustomEvent('form_submit_start', {
        detail: { form_id: formId, page: location.pathname },
      })
    );
    const res = await submitLead(data);
    if (res.ok) {
      setStatus('success');
      document.dispatchEvent(
        new CustomEvent('form_submit_success', {
          detail: { form_id: formId, page: location.pathname },
        })
      );
      setValues({ name: '', email: '', phoneNumber: '', services: '', company: '', notes: '' });
    } else {
      setStatus('error');
      document.dispatchEvent(
        new CustomEvent('form_submit_error', {
          detail: { form_id: formId, page: location.pathname, error_code: res.error },
        })
      );
      const queue = JSON.parse(localStorage.getItem('leadQueue') || '[]');
      queue.push(data);
      localStorage.setItem('leadQueue', JSON.stringify(queue));
    }
  };

  const disableSubmit = !values.email || errors.email !== undefined;

  return (
    <form onSubmit={handleSubmit} noValidate data-form-id={formId} className="space-y-4">
      <input type="text" name="hp" style={{ display: 'none' }} onChange={() => {}} />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
        <input
          id="phone"
          type="tel"
          value={values.phoneNumber}
          onChange={(e) => update('phoneNumber', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />
        {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
      </div>
      <div>
        <label htmlFor="services" className="block text-sm font-medium text-gray-300 mb-2">Service(s) interested in?</label>
        <input
          id="services"
          type="text"
          value={values.services}
          onChange={(e) => update('services', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
        />
      </div>
      <button
        type="submit"
        disabled={disableSubmit || status === 'loading'}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-6 rounded-lg disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending…' : 'Submit'}
      </button>
      {status === 'success' && (
        <p className="text-green-400 text-center">Thanks! We'll be in touch soon.</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-center">Something went wrong. We'll retry automatically.</p>
      )}
    </form>
  );
}
