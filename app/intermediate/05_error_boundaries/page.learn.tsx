// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 05 에러 바운더리
// 난이도: 중급
// 학습 시간: ~15분
// 선행 학습: 04_loading_streaming
//
// [무엇을 배우는가]
// - error.tsx 의 역할 (자식 트리에서 throw 된 에러를 catch)
// - notFound() / not-found.tsx (404)
// - 프로덕션에서 에러 메시지가 마스킹되는 동작
//
// [흔한 함정]
// - error.tsx 는 반드시 "use client" (React Error Boundary 가 클라이언트 개념)
// - error.tsx 는 같은 라우트 세그먼트의 page/layout 에러만 잡음 — 부모 layout 에러는 부모 error.tsx
// - root layout(app/layout.tsx) 의 에러는 app/global-error.tsx 가 잡아야 함
// ─────────────────────────────────────────

import Link from "next/link";

type Props = {
  searchParams: Promise<{ throw?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { throw: shouldThrow } = await searchParams;

  if (shouldThrow === "1") {
    // 서버 컴포넌트에서 throw → React 가 직렬화하여 클라이언트 error.tsx 에 전달.
    // 프로덕션에서는 error.message 가 "An error occurred..." 로 마스킹되고
    // error.digest 만 노출됨 (보안). 개발모드에서만 원본 메시지가 보임.
    throw new Error("의도적으로 던진 에러입니다 — error.tsx 가 잡습니다.");
  }

  return (
    <article>
      <h1 className="text-2xl font-bold">05. 에러 바운더리</h1>
      <p className="mt-2 text-[var(--muted)]">
        쿼리 <code>?throw=1</code> 를 붙이면 컴포넌트가 throw 합니다. 같은 폴더의{" "}
        <code>error.tsx</code> 가 그 에러를 잡아 fallback UI를 보여줍니다.
      </p>
      <div className="mt-4 flex gap-2">
        <Link
          href="?throw=1"
          className="rounded border border-[var(--border)] px-3 py-1.5 text-sm"
        >
          throw 시도
        </Link>
        <Link
          href="?"
          className="rounded border border-[var(--border)] px-3 py-1.5 text-sm"
        >
          정상 상태
        </Link>
      </div>
    </article>
  );
}
