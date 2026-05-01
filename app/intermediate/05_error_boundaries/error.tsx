"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error.tsx] caught:", error);
  }, [error]);

  return (
    <div className="rounded border border-red-500/30 bg-red-50 p-4 dark:bg-red-950/20">
      <h2 className="font-semibold text-red-700 dark:text-red-300">에러 발생</h2>
      <p className="mt-1 text-sm">
        {error.message}
        {error.digest && ` (digest: ${error.digest})`}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-3 rounded border border-red-500/40 px-3 py-1 text-sm"
      >
        다시 시도
      </button>
    </div>
  );
}
