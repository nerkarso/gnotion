import { useColorScheme } from '@mantine/hooks';
import fs from 'fs/promises';
import Cookies from 'js-cookie';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';
import { useEffect, useState } from 'react';
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
      <PageContent recordMap={recordMap} />
    </Layout>
  );
}

function PageContent({ recordMap }: { recordMap: ExtendedRecordMap }) {
  const colorScheme = useColorScheme();
  const AUTH_COOKIE_KEY = 'gnotion_auth';
  const passwords = (process.env.NEXT_PUBLIC_AUTH_PASSWORDS ?? 'gnotion').split(',');
  const [isAuth, setIsAuth] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    if (passwords.includes(password)) {
      Cookies.set(AUTH_COOKIE_KEY, 'true', {
        expires: 60 * 60 * 24 * 1, // 30 days
      });
      setIsAuth(true);
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true') {
      const authCookie = Cookies.get(AUTH_COOKIE_KEY);
      if (authCookie) {
        if (passwords.includes(authCookie)) {
          setIsAuth(true);
        }
      }
    }
  }, []);

  if (!isAuth) {
    return (
      <GenericState
        title="You shall not pass!"
        message="Please enter a password to access to continue"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--bg-color-0)] flex gap-1 p-1 justify-between rounded-lg flex-col sm:flex-row"
        >
          <input
            type="password"
            className="bg-transparent dark:text-white border-none flex-1 px-2 py-2 rounded [font:inherit] [color-scheme:light_dark]"
            placeholder="Password"
            required
            name="password"
          />
          <button
            className="bg-[var(--bg-color-0)] dark:text-white border-none px-3 py-2 rounded-md [font:inherit] cursor-pointer hover:bg-[var(--select-color-0)] transition"
            type="submit"
          >
            Continue
          </button>
        </form>
      </GenericState>
    );
  }

  return (
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
