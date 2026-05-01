import { Suspense } from "react";

async function SlowSection({ label, ms }: { label: string; ms: number }) {
  await new Promise((r) => setTimeout(r, ms));
  return (
    <div className="rounded border border-[var(--border)] p-3">
      <strong>{label}</strong> — {ms}ms 후 도착
    </div>
  );
}

export default function Page() {
  return (
    <article className="space-y-4">
      <h1 className="text-2xl font-bold">04. 로딩과 스트리밍</h1>
      <p className="text-[var(--muted)]">
        Suspense 경계 별로 독립적으로 스트리밍됩니다. 각 박스는 도착 시점이 다릅니다.
      </p>

      <Suspense fallback={<div className="h-12 animate-pulse rounded bg-[rgba(127,127,127,0.2)]" />}>
        <SlowSection label="A" ms={500} />
      </Suspense>

      <Suspense fallback={<div className="h-12 animate-pulse rounded bg-[rgba(127,127,127,0.2)]" />}>
        <SlowSection label="B" ms={1500} />
      </Suspense>

      <Suspense fallback={<div className="h-12 animate-pulse rounded bg-[rgba(127,127,127,0.2)]" />}>
        <SlowSection label="C" ms={3000} />
      </Suspense>
    </article>
  );
}
