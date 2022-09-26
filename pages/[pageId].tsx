import { useColorScheme } from '@mantine/hooks';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPageTitle } from 'notion-utils';
import { NotionRenderer } from 'react-notion-x';
import notion from '../utils/notion';

/**
 * @param {{ recordMap: import('notion-types').ExtendedRecordMap }} props
 */
export default function Page({ recordMap }) {
  const colorScheme = useColorScheme();

  if (!recordMap) return null;

  const title = getPageTitle(recordMap);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_SITE_OG_IMAGE} />
      </Head>
      <style global jsx>
        {
          /* css */ `
            :root {
              --notion-font: ${process.env.NEXT_PUBLIC_THEME_FONT_FAMILY}, system-ui, sans-serif;
              --select-color-0: ${process.env.NEXT_PUBLIC_THEME_PRIMARY_COLOR};
              --neutral-color: hsl(220, 8%, 25%);
            }
            .dark-mode {
              --bg-color: hsl(220, 8%, 8%);
              --bg-color-0: hsl(220, 8%, 15%);
              --bg-color-1: hsl(220, 8%, 20%);
              --bg-color-2: hsla(220, 8%, 10%, 0.15);
              --fg-color-0: var(--neutral-color);
              --fg-color-5: var(--neutral-color);
            }
          `
        }
      </style>
      <NotionRenderer
        showTableOfContents
        components={{ nextImage: Image, nextLink: Link, Code }}
        darkMode={colorScheme === 'dark'}
        disableHeader={true}
        fullPage={true}
        recordMap={recordMap}
      />
    </>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getStaticProps(context) {
  let recordMap = null;

  /** @type String  */
  let pageId = context.params.pageId;
  if (pageId !== 'favicon.ico') {
    recordMap = await notion.getPage(pageId);
  }

  return {
    props: {
      recordMap,
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [],
    // Will server-render pages on-demand if the path doesn't exist.
    fallback: 'blocking',
  };
}

/**
 * Optional Components
 */

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code), {
  ssr: false,
});
