# Lead Forms Architecture

This project uses a shared lead form system that submits all leads server-side through a Router.so endpoint.

## Environment

```
ROUTER_API_KEY=REPLACE_ME
RETRY_TOKEN=generate_a_long_random_string
```

## Flow

1. `LeadForm` component validates input on the client using Zod.
2. Submissions post to `/api/lead` which proxies to Router.so with `ROUTER_API_KEY`.
3. Telemetry (IP, UA, page, referrer, utm) is attached server side.
4. On failure or timeout, submissions are written to `lead-queue.json`.
5. `/api/lead/retry` flushes queued leads when called with `RETRY_TOKEN`.
6. Client side stores failed leads in `localStorage` and retries when back online.

## Phone Standard

All pages display `469-458-6966` and use the click-to-call link `tel:+14694586966`.
Plausible events `cta_phone_click` fire when the phone link is clicked.
