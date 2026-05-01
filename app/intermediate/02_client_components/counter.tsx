"use client";

import { useState } from "react";

export function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);
  return (
    <div className="flex items-center gap-3 rounded border border-[var(--border)] p-3">
      <button
        type="button"
        onClick={() => setCount((c) => c - 1)}
        className="rounded border border-[var(--border)] px-2 py-0.5"
      >
        −
      </button>
      <span className="min-w-12 text-center font-mono">{count}</span>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded border border-[var(--border)] px-2 py-0.5"
      >
        +
      </button>
    </div>
  );
}
