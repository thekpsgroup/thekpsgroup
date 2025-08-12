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
