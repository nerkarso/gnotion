import Image from 'next/image';

type TProps = {
  title?: string;
  message?: string;
};

export default function GenericState({ title, message }: TProps) {
  return (
    <main className="wrapper-middle">
      <div className="wrapper-middle__box">
        <Image
          src={process.env.NEXT_PUBLIC_PLACEHOLDER_IMAGE}
          width={128}
          height={128}
          alt="Illustration"
        />
        {title && <h1>{title}</h1>}
        {message && <h2>{message}</h2>}
      </div>
    </main>
  );
}
