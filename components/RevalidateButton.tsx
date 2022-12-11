import { useRouter } from 'next/router';
import { useState } from 'react';

export default function RevalidateButton() {
  const router = useRouter();
  const path = `/${router.query?.pageId}`;

  const [query, setQuery] = useState({
    isLoading: false,
  });

  const handleRevaildate = async () => {
    setQuery({ isLoading: true });
    try {
      const result = await (
        await fetch(
          `/api/revalidate?token=${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}&path=${path}`
        )
      ).json();
      if (result?.revalidated) {
        window.location.reload();
      } else {
        alert('Revalidation failed');
      }
    } catch (ex) {
      alert(ex.message);
    } finally {
      setQuery({ isLoading: false });
    }
  };

  const refreshIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width={24}
      height={24}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );

  return (
    <div className="revalidate-button">
      <button
        type="button"
        className={query.isLoading ? 'loading' : ''}
        onClick={handleRevaildate}
        disabled={query.isLoading}
      >
        {refreshIcon}
      </button>
    </div>
  );
}
