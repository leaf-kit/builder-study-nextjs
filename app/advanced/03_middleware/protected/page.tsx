type Props = { searchParams: Promise<{ key?: string }> };

export default async function Protected({ searchParams }: Props) {
  const { key } = await searchParams;
  return (
    <article>
      <h1 className="text-2xl font-bold">보호된 페이지</h1>
      <p className="mt-2">
        URL 의 <code>?key</code> 값:{" "}
        <code className="rounded bg-[rgba(127,127,127,0.12)] px-1.5 py-0.5">{key ?? "(없음)"}</code>
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        미들웨어가 없었다면 빈 값으로 진입했을 것입니다. 실무에서는 쿼리 대신 쿠키/JWT.
      </p>
    </article>
  );
}
