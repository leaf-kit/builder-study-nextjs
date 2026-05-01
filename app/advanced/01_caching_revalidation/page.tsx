import { unstable_cache } from "next/cache";

const getCachedTime = unstable_cache(
  async () => new Date().toISOString(),
  ["cached-time"],
  { revalidate: 10, tags: ["time"] },
);

export default async function Page() {
  const cached = await getCachedTime();
  const live = new Date().toISOString();
  return (
    <article>
      <h1 className="text-2xl font-bold">01. 캐시와 재검증</h1>
      <p className="mt-2 text-[var(--muted)]">
        아래 두 값을 비교하세요. 페이지를 새로고침해도 <code>cached</code> 는 10초 동안 같은 값,
        <code>live</code> 만 매번 바뀝니다.
      </p>
      <pre className="mt-3 rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`cached: ${cached}
live:   ${live}`}
      </pre>
      <p className="mt-3 text-sm text-[var(--muted)]">
        무효화 트리거: 다음 토픽 <code>02_server_actions</code> 에서 폼 제출 후{" "}
        <code>revalidateTag(&quot;time&quot;)</code> 호출하는 예시 참고.
      </p>
    </article>
  );
}
