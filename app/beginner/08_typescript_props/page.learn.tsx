// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 08 TS Props / params / searchParams
// 난이도: 초급
// 학습 시간: ~15분
// 선행 학습: 02_pages_routes, 03_layouts
//
// [무엇을 배우는가]
// - Page/Layout 의 props 타입
// - Next.js 15+ 에서 params/searchParams 가 Promise 로 바뀐 이유
// - 검색 쿼리 기본값 처리 패턴
//
// [왜 알아야 하는가]
// 실무 Next.js 코드의 절반은 "URL/쿼리/세그먼트 → 데이터 → 화면" 의 매핑.
// 타입을 정확히 잡아야 컴파일러가 버그를 미리 잡아준다.
//
// [어디에 쓰는가]
// - 검색 페이지: ?q=, ?sort=
// - 페이지네이션: ?page=
// - 필터: ?tag=, ?category=
//
// [흔한 함정]
// - Next.js 14: { searchParams } 는 동기 객체였음
// - Next.js 15+: Promise 가 됨 (await 필요). 마이그레이션 가이드 참고
// - searchParams 의 같은 키가 여러 번 오면 string[] 이 됨
// ─────────────────────────────────────────

// 검색 파라미터 타입을 명시적으로.
// 알려진 키는 좁은 타입 ("asc" | "desc"), 알려지지 않은 키는 string | string[] | undefined.
type SearchParams = Promise<{ q?: string; sort?: "asc" | "desc" }>;

type Props = {
  // params 도 비슷하게 Promise<{ slug: string }> 형태. 이 페이지는 params 없음.
  searchParams: SearchParams;
};

// async 함수로 만들어 await 가능. 서버 컴포넌트만 가능 (클라이언트 컴포넌트는 async 안 됨).
export default async function Page({ searchParams }: Props) {
  // 객체 디스트럭처링과 기본값을 한 번에.
  // 기본값은 "사용자가 명시하지 않았을 때 어떤 값으로 동작할지" 의 정책 표현.
  const { q = "", sort = "asc" } = await searchParams;

  return (
    <article>
      <h1 className="text-2xl font-bold">08. TS Props / params / searchParams</h1>

      <p className="mt-2 text-[var(--muted)]">
        URL에 <code>?q=hello&sort=desc</code> 를 붙여보세요.
      </p>

      {/* JSON.stringify(value, null, 2) — 가독성 좋게 들여쓰기. */}
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

// ─────────────────────────────────────────
// 직접 해보기
// 1) sort 의 타입을 "asc" | "desc" 가 아니라 string 으로 바꿔보세요.
//    → 더 느슨하지만 자동 완성이 사라짐.
// 2) sort 가 위 두 값이 아니면 throw 하는 가드를 추가해 보세요.
//    if (sort !== "asc" && sort !== "desc") throw new Error("invalid sort");
// ─────────────────────────────────────────
