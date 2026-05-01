// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 08 Route Handlers
// 난이도: 중급
// 학습 시간: ~25분
// 선행 학습: 03_data_fetching
//
// [무엇을 배우는가]
// - app/.../route.ts 한 파일이 곧 API 엔드포인트
// - GET/POST/PUT/PATCH/DELETE export 함수의 시그니처
// - NextRequest / NextResponse / Response 의 차이
//
// [어디에 쓰는가]
// - 외부 webhook 받기
// - 클라이언트 컴포넌트나 외부 시스템이 호출할 REST 엔드포인트
// - 단, 폼 뮤테이션은 Server Actions가 더 자연스러움 (다음 트랙)
//
// [흔한 함정]
// - GET 핸들러는 기본적으로 정적으로 캐시될 수 있음 — searchParams/cookies/headers 사용 시 동적
// - 큰 body 받으려면 streaming 처리 필요 (req.body 가 ReadableStream)
// ─────────────────────────────────────────

import { ApiPlayground } from "./api-playground";

export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">08. Route Handlers (API)</h1>
      <p className="mt-2 text-[var(--muted)]">
        본 학습 저장소에는 두 개의 API 라우트가 있습니다:
      </p>
      <ul className="mt-2 list-disc pl-6 text-sm">
        <li>
          <code>GET /api/health</code> — 서버 건강 체크
        </li>
        <li>
          <code>GET /api/posts?q=...</code>, <code>POST /api/posts</code> — 게시글 CRUD 시범
        </li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">바로 호출해 보기</h2>
      <ApiPlayground />

      <p className="mt-4 text-xs text-[var(--muted)]">
        터미널에서: <code>curl http://localhost:3000/api/health</code>
      </p>
    </article>
  );
}
