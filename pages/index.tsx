import { NextSeo } from 'next-seo';
import GenericState from '../components/GenericState';

export default function Home() {
  return (
    <>
      <NextSeo
        openGraph={{
          images: [
            {
              url: process.env.NEXT_PUBLIC_OG_IMAGE,
              width: 1200,
              height: 630,
              alt: process.env.NEXT_PUBLIC_SITE_TITLE,
            },
          ],
        }}
      />
      <GenericState message="Nothing to see here" />
    </>
  );
}
