import RevalidateButton from './RevalidateButton';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <style global jsx>
        {
          /* css */ `
            :root {
              --notion-font: ${process.env.NEXT_PUBLIC_THEME_FONT_FAMILY}, system-ui, sans-serif;
              --select-color-0: ${process.env.NEXT_PUBLIC_THEME_PRIMARY_COLOR};
            }
          `
        }
      </style>
      <RevalidateButton />
      {children}
    </>
  );
}
