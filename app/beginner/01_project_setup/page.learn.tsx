// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 01 프로젝트 셋업
// 난이도: 초급
// 학습 시간: ~10분
// 선행 학습: 없음 (가장 먼저 보는 파일)
//
// [실행 방법]
// - VS Code: 루트에서 F5 (Next.js 서버 디버그) → http://localhost:3000/beginner/01_project_setup
// - 터미널: pnpm dev → 위 URL 접속
// - raw 버전: ./page.tsx (이 파일과 동일 동작)
//
// [무엇을 배우는가]
// Next.js 프로젝트의 디렉토리 구조와 각 파일의 역할.
//
// [왜 알아야 하는가]
// 프레임워크가 정한 컨벤션을 모르면 "이 파일은 왜 이 위치에 있어야 하지?" 라는
// 질문에서 영원히 못 빠져나옵니다. 컨벤션이 곧 라우팅이고 곧 동작입니다.
//
// [어디에 쓰는가 — 실전 활용]
// - 신규 토픽/페이지 추가 시 어디에 폴더를 만들지 결정
// - 동료가 만든 코드를 처음 볼 때 폴더 구조만으로 80% 파악
//
// [흔한 함정]
// - app/ 안에 page.tsx가 없는 폴더는 라우트가 안 됨 (그냥 import 가능한 폴더일 뿐)
// - "use client"가 잘못 붙으면 서버 전용 API가 빌드 에러를 냄
//
// [예상 출력]
// 브라우저 화면에 "01. 프로젝트 셋업" 제목과 셋업 가이드가 표시됨
// ─────────────────────────────────────────

import Link from "next/link";
// ↑ next/link: 클라이언트-사이드 네비게이션. <a>와 비슷하지만 Next.js 라우터를 통과해
//    프리페치/캐시가 자동 동작.

// ↓ 이 컴포넌트는 "use client" 지시문이 없으므로 기본값인 서버 컴포넌트.
//    그 결과 이 함수는 서버에서 호출되고, 결과 HTML/RSC payload만 브라우저로 전송됨.
//    이 안에서는 useState/useEffect/onClick 같은 클라이언트 훅을 못 씀.
export default function Page() {
  // 서버 컴포넌트의 함수 본문은 서버에서 실행됨.
  // 여기서 console.log를 해도 브라우저가 아니라 터미널에 찍힘 — 학습자가 자주 헷갈림.
  return (
    <article className="prose max-w-none">
      {/* Tailwind의 prose는 학습 저장소에 추가하지 않았으므로 무효 클래스지만,
          글의 의도를 표시하기 위해 남겨둠. 실제 스타일은 max-w-none 만 적용. */}
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
        {/* <pre>는 공백을 그대로 보여주는 태그. JSX 안에서는 한 줄 문자열로 안 들어가서
            템플릿 리터럴 안에 줄바꿈을 그대로 넣음. */}
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
        {/* <Link>는 typedRoutes가 켜지면 href가 실제 라우트로 타입 체크된다.
            오타가 나면 컴파일 타임에 빨간 줄. */}
        <Link href="/beginner/02_pages_routes" className="text-[var(--accent)] underline">
          02 페이지와 라우트 →
        </Link>
      </p>
    </article>
  );
}

// ─────────────────────────────────────────
// 직접 해보기
// 1) 이 폴더에 새 파일 `notes.tsx`를 만들고 import 가능한지 확인하세요.
//    → 라우트가 되려면 파일명이 `page.tsx` 여야 합니다. notes.tsx는 라우트가 아닙니다.
//
// 2) 같은 폴더에 `loading.tsx` 파일을 만들고 간단한 "로딩 중..." 텍스트만 export 해보세요.
//    → 페이지 로딩 시 잠깐 보이는 것을 확인할 수 있습니다 (네트워크 throttle 권장).
//
// 정답 (주석 처리):
// // app/beginner/01_project_setup/loading.tsx
// // export default function Loading() { return <p>로딩 중...</p>; }
// ─────────────────────────────────────────
