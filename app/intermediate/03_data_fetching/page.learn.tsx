// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 03 데이터 페칭
// 난이도: 중급
// 학습 시간: ~25분
// 선행 학습: 01_server_components
//
// [무엇을 배우는가]
// - async 서버 컴포넌트에서 fetch 사용
// - Next.js 가 확장한 fetch 옵션 (next.revalidate, next.tags)
// - 같은 컴포넌트 트리 안의 fetch 자동 메모이제이션
//
// [어디에 쓰는가]
// - 게시글 목록, 상세, 사용자 프로필 등 거의 모든 read-only 데이터
//
// [흔한 함정]
// - cache: "no-store" → 매 요청마다 호출 (DB 부담 주의)
// - 외부 API 가 캐시 가능한지 / private 인지 확인
// - 같은 URL 로 옵션이 다른 fetch 를 호출하면 별개 캐시 항목으로 저장됨
// ─────────────────────────────────────────

type Joke = { id: number; type: string; setup: string; punchline: string };

// 데이터 가져오기를 함수로 분리 — 테스트 용이성과 가독성.
async function getJoke(): Promise<Joke> {
  // Next.js는 fetch에 두 가지 옵션을 추가로 인식한다:
  // - cache: "force-cache" | "no-store"  (내장 옵션)
  // - next: { revalidate, tags }         (Next.js 확장)
  const res = await fetch("https://official-joke-api.appspot.com/random_joke", {
    next: {
      revalidate: 60,        // 60초 후 stale, 백그라운드에서 갱신
      tags: ["jokes"],       // revalidateTag("jokes") 로 즉시 무효화 가능
    },
  });
  if (!res.ok) throw new Error("Failed to fetch joke");
  return res.json();
}

export default async function Page() {
  // 같은 요청 안에서 getJoke 를 여러 번 호출해도 fetch 는 한 번만 (Request Memoization).
  const joke = await getJoke();
  return (
    <article>
      <h1 className="text-2xl font-bold">03. 데이터 페칭</h1>
      <p className="mt-2 text-[var(--muted)]">
        <code>fetch</code> 결과는 60초 동안 Data Cache 에 저장됩니다 (ISR).
      </p>
      <blockquote className="mt-4 border-l-4 border-[var(--accent)] pl-4">
        <p className="font-medium">{joke.setup}</p>
        <p className="mt-2 text-[var(--muted)]">— {joke.punchline}</p>
      </blockquote>
    </article>
  );
}

// ─────────────────────────────────────────
// 직접 해보기
// 1) revalidate 를 5 로 줄이고 페이지를 5초 후 새로고침.
// 2) cache: "no-store" 로 바꾸고 새로고침 시 매번 다른 농담이 오는지 확인.
// 3) 두 개의 다른 fetch 를 추가하고 Promise.all 로 병렬 호출 → 응답 시간 비교.
// ─────────────────────────────────────────
