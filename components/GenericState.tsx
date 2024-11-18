import Image from 'next/legacy/image';

type TProps = {
  title?: string;
  message?: string;
  children?: React.ReactNode;
};

export default function GenericState({ title, message, children }: TProps) {
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
        {message && <p className="wrapper-middle__box__desc">{message}</p>}
        {children}
      </div>
    </main>
  );
}
