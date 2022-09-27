import { withOGImage } from 'next-api-og-image';

export default withOGImage<'query', 'subtitle' | 'title' | 'image'>({
  cacheControl: 'max-age=0, s-maxage=86400, stale-while-revalidate=3600',
  type: 'jpeg',
  quality: 75,
  dev: {
    inspectHtml: false,
  },
  template: {
    react: ({ subtitle, title, image }) => {
      return (
        <html>
          <head>
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap"
              rel="stylesheet"
            />
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
          </head>
          <body className="bg-gray-900 text-white" style={{ fontFamily: 'Inter' }}>
            <main className="grid place-items-center absolute inset-0">
              <div className="w-full px-16 flex gap-8 items-center">
                <div className="flex-1">
                  {subtitle && (
                    <h4 className="font-semibold text-4xl text-blue-500 mb-4">{subtitle}</h4>
                  )}
                  {title && <h1 className="font-semibold text-8xl">{title}</h1>}
                </div>
                {image && <img src={image} alt="" className="max-w-xs w-full" />}
              </div>
            </main>
          </body>
        </html>
      );
    },
  },
});
