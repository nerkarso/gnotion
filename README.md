# gnotion

Turn your Notion pages into a website with instant page loads and SEO optimization.

## Environment Variables

Create a `.env` file and add the following:

```sh
// You can generate your own random string
REVALIDATE_TOKEN="h6zz7e7gpx4ia6uz"
NEXT_PUBLIC_SITE_TITLE=""
NEXT_PUBLIC_SITE_FAVICON=""
```

## Incremental Static Regeneration

Next.js allows you to create or update static pages after you’ve built your site. Starting with v12.2.0, Next.js supports On-Demand Incremental Static Regeneration to manually purge the Next.js cache for a specific page.

```sh
curl http://localhost:3000/api/revalidate?secret=xxxxxx&path=/path/to
```

- `secret`: replace with your `REVALIDATE_TOKEN`.
- `path`: the exact path that you want revalidated.
