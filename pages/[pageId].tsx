import { useColorScheme } from '@mantine/hooks';
import fs from 'fs/promises';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';
import { NotionRenderer } from 'react-notion-x';
import GenericState from '../components/GenericState';
import Layout from '../components/Layout';
import { getPageIcon } from '../utils/getPageIcon';
import notion from '../utils/notion';

type TProps = {
  error: any;
  recordMap: ExtendedRecordMap;
};

export default function Page({ error, recordMap }: TProps) {
  const colorScheme = useColorScheme();

  if (error || !recordMap) {
    return (
      <Layout>
        <GenericState title="Error" message={error?.message || 'No data available'} />
      </Layout>
    );
  }

  const title = getPageTitle(recordMap);
  const icon = getPageIcon(recordMap, process.env.NEXT_PUBLIC_PLACEHOLDER_IMAGE);
  const ogImageUrl = process.env.NEXT_PUBLIC_SITE_URL.concat(
    '/api/og-image?',
    'subtitle=',
    process.env.NEXT_PUBLIC_SITE_TITLE,
    '&title=',
    title,
    '&image=',
    icon
  );

  // Useful for debugging from the DevTools console
  if (typeof window !== 'undefined') {
    const keys = Object.keys(recordMap?.block || {});
    const block = recordMap?.block?.[keys[0]]?.value;
    const w = window as any;
    w.recordMap = recordMap;
    w.block = block;
  }

  return (
    <Layout>
      <NextSeo
        defaultTitle={title}
        openGraph={{
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <div id="container">
        <NotionRenderer
          showTableOfContents
          components={{ nextImage: Image, nextLink: Link, Code, Collection }}
          darkMode={colorScheme === 'dark'}
          disableHeader={true}
          fullPage={true}
          recordMap={recordMap}
          minTableOfContentsItems={1}
        />
        <PrismMac />
      </div>
    </Layout>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getStaticProps(context) {
  let error = null;
  let recordMap = null;

  /** @type String  */
  let pageId = context.params.pageId;
  if (pageId !== 'favicon.ico') {
    try {
      recordMap = await notion.getPage(pageId);
      // Useful for debugging
      if (process.env.NODE_ENV === 'development') {
        await fs.writeFile(`./coverage/${pageId}.json`, JSON.stringify(recordMap, null, 2));
      }
    } catch (ex) {
      error = {
        message: ex.message,
      };
    }
  }

  return {
    props: {
      error,
      recordMap,
    },
    revalidate: 60, // In seconds
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

const PrismMac = dynamic(
  () => import('../components/third-party/PrismMac').then((m) => m.PrismMac),
  { ssr: false }
);

const Collection = dynamic(
  () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
  { ssr: false }
);
