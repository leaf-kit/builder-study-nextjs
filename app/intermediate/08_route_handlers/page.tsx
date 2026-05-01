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
