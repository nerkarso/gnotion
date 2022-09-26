import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
        <meta name="title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_SITE_OG_IMAGE} />
      </Head>
      <main className="wrapper-middle">
        <div className="wrapper-middle__box">
          <Image
            src="/img/page-not-found-1.png"
            quality={100}
            width={256}
            height={256}
            alt="Page not found"
          />
          <h2>Nothing to see here</h2>
        </div>
      </main>
    </>
  );
}
