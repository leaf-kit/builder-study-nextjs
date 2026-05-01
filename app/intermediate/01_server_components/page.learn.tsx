// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 01 Server Components (RSC)
// 난이도: 중급
// 학습 시간: ~20분
// 선행 학습: 00_foundations/01_mental_models.md, 02_pages_routes
//
// [무엇을 배우는가]
// - RSC가 무엇이고 왜 기본인가
// - headers() / cookies() 같은 dynamic API 사용
// - dynamic API 사용이 캐시에 미치는 영향
//
// [흔한 함정]
// - headers() / cookies() 를 호출한 페이지는 정적 캐시가 자동 비활성화됨
// - 비밀 키, DB 호출 등은 RSC에서만 (클라이언트 컴포넌트로 import 시 빌드 에러)
// ─────────────────────────────────────────

import { headers } from "next/headers";
// ↑ headers() 는 Promise<ReadonlyHeaders> 를 반환하는 함수.
//    이 함수를 호출한 페이지/컴포넌트는 Next.js 가 동적 렌더로 강제 전환.

export default async function Page() {
  // 매 요청마다 새로 만들어지는 값 (정적 캐시 무효).
  const ts = new Date().toISOString();
  // headers() 자체는 동기 호출처럼 보이지만 await 필요 (Next.js 15+).
  const ua = (await headers()).get("user-agent") ?? "(unknown)";

  return (
    <article>
      <h1 className="text-2xl font-bold">01. Server Components</h1>
      <p className="mt-2 text-[var(--muted)]">
        이 컴포넌트는 서버에서만 실행됩니다. 아래 두 값은 매 요청마다 서버에서 생성된 결과입니다.
      </p>
      {/* ts 와 ua 는 서버에서 계산되어 HTML로 직렬화 → 브라우저로 전달 */}
      <pre className="mt-3 rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`Rendered at: ${ts}
User-Agent:   ${ua}`}
      </pre>
      <p className="mt-3 text-sm">
        브라우저에 가는 자바스크립트에는 위 값들이 <strong>이미 박혀</strong> 있습니다.
        새로고침하면 새 값으로 다시 만들어집니다.
      </p>
    </article>
  );
}
