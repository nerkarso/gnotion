# gnotion

Turn your Notion pages into a website with instant page loads and SEO optimization.

## Usage

Let's assume you have this [Notion page](https://www.notion.so/nerkarso/Example-8a3e3cf883454b9ca073b125e88715b4) and you want to turn it into a website, then follow these steps:

1. Open Notion page.
2. **Share** > toggle **Share to web**.
3. Turn this: `https://www.notion.so/nerkarso/Example-8a3e3cf883454b9ca073b125e88715b4`
4. Into this: `http://localhost:3000/Example-8a3e3cf883454b9ca073b125e88715b4`

## Environment Variables

Create a `.env.local` file and add the following:

```sh
NEXT_PUBLIC_FAVICON="/img/favicon.png"
NEXT_PUBLIC_OG_IMAGE="/img/og-image.png"
NEXT_PUBLIC_PLACEHOLDER_IMAGE="/img/placeholder.png"
NEXT_PUBLIC_REVALIDATE_TOKEN="gnotion"
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
curl http://localhost:3000/api/revalidate?token=xxxxxx&path=/path/to
```

- `token`: replace with your `NEXT_PUBLIC_REVALIDATE_TOKEN`.
- `path`: the exact path that you want revalidated.
