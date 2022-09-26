import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${process.env.NEXT_PUBLIC_THEME_FONT_FAMILY}:wght@100;400;500;600;700&display=swap`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
