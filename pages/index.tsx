import GenericState from '../components/GenericState';

export default function Home() {
  return <GenericState title={process.env.NEXT_PUBLIC_SITE_TITLE} message="Nothing to see here" />;
}
