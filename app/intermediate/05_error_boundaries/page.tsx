import Link from "next/link";

type Props = {
  searchParams: Promise<{ throw?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { throw: shouldThrow } = await searchParams;

  if (shouldThrow === "1") {
    throw new Error("의도적으로 던진 에러입니다 — error.tsx 가 잡습니다.");
  }

  return (
    <article>
      <h1 className="text-2xl font-bold">05. 에러 바운더리</h1>
      <p className="mt-2 text-[var(--muted)]">
        쿼리 <code>?throw=1</code> 를 붙이면 컴포넌트가 throw 합니다. 같은 폴더의{" "}
        <code>error.tsx</code> 가 그 에러를 잡아 fallback UI를 보여줍니다.
      </p>
      <div className="mt-4 flex gap-2">
        <Link
          href="?throw=1"
          className="rounded border border-[var(--border)] px-3 py-1.5 text-sm"
        >
          throw 시도
        </Link>
        <Link
          href="?"
          className="rounded border border-[var(--border)] px-3 py-1.5 text-sm"
        >
          정상 상태
        </Link>
      </div>
    </article>
  );
}
