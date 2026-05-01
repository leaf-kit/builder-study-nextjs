"use client";

import { useRouter } from "next/navigation";

export function ProgrammaticNav() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => router.push("/beginner/02_pages_routes")}
        className="rounded border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--accent)]"
      >
        push 02
      </button>
      <button
        type="button"
        onClick={() => router.replace("/beginner/03_layouts")}
        className="rounded border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--accent)]"
      >
        replace 03
      </button>
      <button
        type="button"
        onClick={() => router.back()}
        className="rounded border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--accent)]"
      >
        back
      </button>
      <button
        type="button"
        onClick={() => router.refresh()}
        className="rounded border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--accent)]"
      >
        refresh (RSC payload 재요청)
      </button>
    </div>
  );
}
