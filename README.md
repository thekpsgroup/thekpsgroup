# The KPS Group Website

This project is built with [Astro](https://astro.build/) and TypeScript.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run lint` | Run Astro's type and accessibility checks |
| `npm run build` | Build the production site to `./dist` |
| `npm run preview` | Preview the built site locally |
| `npm run test` | Run Playwright tests |
| `npm run check:links` | Scan the running preview for broken links |

To run the link check you must first build and preview:

```bash
npm run build
npm run preview &
npm run check:links
```

## Adding Location or Service Pages

1. Create a new `.astro` file under `src/pages/locations` or `src/pages/services`.
2. Include page `title`, `description`, and JSON-LD schema for `LocalBusiness` or `Service` as appropriate.
3. Verify the route appears in `sitemap.xml` and has no broken links.

## Accessibility

The site includes a skip-to-content link and enhanced focus styles. Use `npm run lint` to run accessibility checks.

## Forms & Analytics

Lead forms submit directly to [Router.so](https://router.so/) using the following payload and headers:

```json
{
  "name": "Jane Doe",
  "phoneNumber": "469-534-3392",
  "email": "jane@example.com",
  "services": "Bookkeeping"
}
```

Headers:

```
Authorization: Bearer <ROUTER_SO_API_KEY>
Content-Type: application/json
```

The Plausible tracker (enabled when `PUBLIC_PLAUSIBLE_ENABLED=true`) records:

- `cta_click` for elements with `data-cta` or any `tel:`/`mailto:` links
- `form_submit_click`, `form_submit_success`, `form_submit_error`, `form_submit_invalid`

Before deploying, ensure the environment contains:

```
PUBLIC_PLAUSIBLE_ENABLED
PUBLIC_PLAUSIBLE_DOMAIN
GTM_ID
ROUTER_SO_ENDPOINT
ROUTER_SO_API_KEY
```
