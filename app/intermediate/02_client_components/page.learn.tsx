// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 02 Client Components
// 난이도: 중급
// 학습 시간: ~20분
// 선행 학습: 01_server_components
//
// [무엇을 배우는가]
// - "use client" 의 의미와 경계
// - 서버 → 클라이언트로 props 를 넘길 때 직렬화 규칙
// - "use client" 트리는 import 따라 전염된다는 사실
//
// [흔한 함정]
// - 페이지 전체를 "use client" 로 만드는 잘못된 습관 (필요한 leaf 만 client)
// - props 로 함수(콜백)를 넘기려 하면 직렬화 에러 — Server Action 으로 우회
// ─────────────────────────────────────────

// 이 파일은 서버 컴포넌트 (use client 없음).
// 그러나 자식 컴포넌트(Counter)는 클라이언트 컴포넌트.
import { Counter } from "./counter";

export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">02. Client Components</h1>
      <p className="mt-2 text-[var(--muted)]">
        이 페이지(서버 컴포넌트) 안에서 클라이언트 컴포넌트(<code>Counter</code>)를 import해 사용합니다.
      </p>
      <div className="mt-4">
        {/* 서버에서 클라이언트 컴포넌트로 props 전달.
            initial 은 number 라 직렬화 가능 → OK.
            만약 일반 함수를 넘기면 에러. (Server Action 만 예외) */}
        <Counter initial={0} />
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">
        DevTools → Network → JS 항목에서 Counter 의 자바스크립트가 별도 번들로 내려오는지 확인.
      </p>
    </article>
  );
}
