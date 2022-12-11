# gnotion

Turn your Notion pages into a website with instant page loads and SEO optimization.

## Environment Variables

Create a `.env.local` file and add the following:

```sh
REVALIDATE_TOKEN="gnotion"
NEXT_PUBLIC_FAVICON="/img/favicon.png"
NEXT_PUBLIC_OG_IMAGE="/img/og-image.png"
NEXT_PUBLIC_PLACEHOLDER_IMAGE="/img/placeholder.png"
NEXT_PUBLIC_SITE_TITLE="Docs"
NEXT_PUBLIC_SITE_URL="https://gnotion.vercel.app"
NEXT_PUBLIC_THEME_FONT_FAMILY="Proxima Nova"
NEXT_PUBLIC_THEME_PRIMARY_COLOR="#3399ff"
```

## Generate Open Graph Image

```sh
http://localhost:3000/api/og-image?subtitle=Docs&title=Web%20Development&image=https://gnotion.vercel.app/img/placeholder.png
```

## Incremental Static Regeneration

Next.js allows you to create or update static pages after you’ve built your site. Starting with v12.2.0, Next.js supports On-Demand Incremental Static Regeneration to manually purge the Next.js cache for a specific page.

```sh
curl http://localhost:3000/api/revalidate?secret=xxxxxx&path=/path/to
```

- `secret`: replace with your `REVALIDATE_TOKEN`.
- `path`: the exact path that you want revalidated.
