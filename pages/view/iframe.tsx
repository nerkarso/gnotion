export default function Iframe({ pageId }: { pageId: string }) {
  const url = `${process.env.NEXT_PUBLIC_NOTION_PUBLISH_DOMAIN}/ebd/${pageId}`;

  return (
    <div className="iframe-root h-full">
      <iframe
        src={url}
        className="w-full h-[calc(100%+var(--header-offset))] -mt-[var(--header-offset)] border-0"
        title="Page"
      ></iframe>
    </div>
  );
}
