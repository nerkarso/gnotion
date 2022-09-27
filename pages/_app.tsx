import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

// Core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// Used for code syntax highlighting
import 'prismjs/themes/prism-tomorrow.min.css';
// Global styles
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={process.env.NEXT_PUBLIC_SITE_FAVICON} type="image/png" />
      </Head>
      <DefaultSeo
        defaultTitle={process.env.NEXT_PUBLIC_SITE_TITLE}
        openGraph={{
          type: 'website',
          url: process.env.NEXT_PUBLIC_SITE_URL,
          site_name: process.env.NEXT_PUBLIC_SITE_TITLE,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
