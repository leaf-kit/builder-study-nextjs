// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 03 Middleware
// 난이도: 고급
// 학습 시간: ~25분
//
// [무엇을 배우는가]
// - middleware.ts 가 모든 요청을 가로채 처리
// - matcher 로 적용 경로 제한
// - 응답 헤더 주입, redirect, rewrite
//
// [어디에 쓰는가]
// - 인증 게이트 (로그인 안 된 사용자 → /login 리다이렉트)
// - A/B 실험 분기 (cookie 따라 다른 경로로 rewrite)
// - i18n 자동 redirect (Accept-Language 기반)
// - 보안 헤더 추가 (CSP, X-Frame-Options)
//
// [흔한 함정]
// - middleware.ts 는 항상 Edge 런타임 — Node API 못 씀
// - 큰 라이브러리 import 하면 cold start 가 길어짐
// - matcher 패턴이 너무 넓으면 정적 자산까지 처리해서 느려짐
// ─────────────────────────────────────────

import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const greeting = (await headers()).get("x-study-greeting");
  return (
    <article>
      <h1 className="text-2xl font-bold">03. Middleware</h1>
      <p className="mt-2 text-[var(--muted)]">
        루트의 <code>middleware.ts</code> 가 모든 요청에 헤더를 주입합니다.
      </p>
      <pre className="mt-3 rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`X-Study-Greeting: ${greeting ?? "(없음)"}`}
      </pre>
      <p className="mt-3 text-sm">
        보호된 라우트로 진입 시도:{" "}
        <Link href="/advanced/03_middleware/protected" className="underline">
          /protected
        </Link>{" "}
        → 미들웨어가 자동으로 <code>?key=secret</code> 을 붙여 redirect.
      </p>
    </article>
  );
}
