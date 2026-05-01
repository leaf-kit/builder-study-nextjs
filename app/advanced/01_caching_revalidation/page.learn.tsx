// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 01 캐시와 재검증
// 난이도: 고급
// 학습 시간: ~30분
// 선행 학습: 02_intermediate/03_data_fetching
//
// [무엇을 배우는가]
// - unstable_cache 로 임의 함수 결과를 Data Cache 에 저장
// - revalidate (시간 기반) 와 tags (이벤트 기반) 의 차이
// - 4겹 캐시 (요청 메모이제이션 / Data Cache / Full Route / Router) 의 상호작용
//
// [흔한 함정]
// - unstable_cache 의 key 배열이 캐시 식별자. 함수 인자가 같아도 key 가 다르면 다른 항목.
// - cookies()/headers() 를 호출하면 자동으로 Full Route Cache 비활성화
// - revalidateTag 는 Server Action / Route Handler 에서만 (서버 모듈에서)
// ─────────────────────────────────────────

import { unstable_cache } from "next/cache";

// unstable_cache: fetch 가 아닌 임의의 함수를 Data Cache 로 감싸는 헬퍼.
// (Next.js 의 stable API 가 되는 중. 이름의 unstable_ 은 곧 빠질 예정)
const getCachedTime = unstable_cache(
  async () => new Date().toISOString(),
  ["cached-time"],          // 캐시 키 (배열). 인자에 따라 분기하려면 키에 인자 포함.
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
