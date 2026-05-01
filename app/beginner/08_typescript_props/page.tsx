type SearchParams = Promise<{ q?: string; sort?: "asc" | "desc" }>;

type Props = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: Props) {
  const { q = "", sort = "asc" } = await searchParams;

  return (
    <article>
      <h1 className="text-2xl font-bold">08. TS Props / params / searchParams</h1>

      <p className="mt-2 text-[var(--muted)]">
        URL에 <code>?q=hello&sort=desc</code> 를 붙여보세요.
      </p>

      <pre className="mt-3 rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{JSON.stringify({ q, sort }, null, 2)}
      </pre>

      <h2 className="mt-6 text-lg font-semibold">동적 세그먼트는 06번 토픽에서</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        params(예: <code>[slug]</code>) 도 비슷하게 Promise 로 받습니다.
      </p>
    </article>
  );
}
