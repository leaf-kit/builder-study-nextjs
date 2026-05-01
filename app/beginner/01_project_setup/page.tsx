import Link from "next/link";

export default function Page() {
  return (
    <article className="prose max-w-none">
      <h1 className="text-2xl font-bold">01. 프로젝트 셋업</h1>
      <p className="mt-2 text-[var(--muted)]">
        이 페이지가 보인다면 셋업은 이미 끝났다는 뜻. 이 토픽은 디렉토리 의미를 익히는 토픽입니다.
      </p>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">루트 디렉토리의 핵심 파일</h2>
        <ul className="mt-2 list-disc pl-6 text-sm">
          <li><code>package.json</code> — 의존성과 npm scripts</li>
          <li><code>tsconfig.json</code> — TS 설정 (strict + noUncheckedIndexedAccess 권장)</li>
          <li><code>next.config.ts</code> — Next.js 설정</li>
          <li><code>tailwind.config.ts</code> + <code>postcss.config.mjs</code> — Tailwind</li>
          <li><code>app/</code> — App Router의 진입점. 폴더 구조 = URL 구조</li>
          <li><code>public/</code> — 정적 자산 (URL 루트로 노출)</li>
          <li><code>.vscode/</code> — 학습자가 F5만 눌러도 실행되도록 미리 설정</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">처음 명령</h2>
        <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`pnpm install        # 의존성 설치
pnpm dev            # 개발 서버 (Turbopack)
pnpm build          # 프로덕션 빌드
pnpm start          # 프로덕션 실행
pnpm typecheck      # TS 타입 체크
pnpm lint           # ESLint`}
        </pre>
      </section>

      <p className="mt-6 text-sm">
        다음:{" "}
        <Link href="/beginner/02_pages_routes" className="text-[var(--accent)] underline">
          02 페이지와 라우트 →
        </Link>
      </p>
    </article>
  );
}
