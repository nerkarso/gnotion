import type { GetServerSidePropsContext } from 'next';
import Iframe from './iframe';

export default function Page({ pageId }: { pageId: string }) {
  return <Iframe pageId={pageId} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params;

  return {
    props: {
      pageId: slug,
    },
  };
}
