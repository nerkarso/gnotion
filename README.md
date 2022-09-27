# gnotion

Turn your Notion pages into a website with instant page loads and SEO optimization.

## Environment Variables

Create a `.env` file and add the following:

```sh
// You can generate your own random string
REVALIDATE_TOKEN="gnotion"
NEXT_PUBLIC_SITE_TITLE=""
NEXT_PUBLIC_SITE_FAVICON=""
NEXT_PUBLIC_THEME_FONT_FAMILY="Proxima Nova"
NEXT_PUBLIC_THEME_PRIMARY_COLOR="#3399ff"
```

## Generate Open Graph Image

```sh
http://localhost:3000/api/og-image?subtitle=Docs&title=Web%20Development&image=https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f4d8.svg
```

## Incremental Static Regeneration

Next.js allows you to create or update static pages after you’ve built your site. Starting with v12.2.0, Next.js supports On-Demand Incremental Static Regeneration to manually purge the Next.js cache for a specific page.

```sh
curl http://localhost:3000/api/revalidate?secret=xxxxxx&path=/path/to
```

- `secret`: replace with your `REVALIDATE_TOKEN`.
- `path`: the exact path that you want revalidated.
