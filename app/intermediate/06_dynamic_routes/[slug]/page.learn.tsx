// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 06 동적 라우트
// 난이도: 중급
// 학습 시간: ~20분
// 선행 학습: 02_pages_routes, 08_typescript_props
//
// [무엇을 배우는가]
// - [slug] 동적 세그먼트
// - generateStaticParams (SSG, 빌드 시 prerender 할 경로 지정)
// - [...catchAll] / [[...optionalCatchAll]] 변형
//
// [흔한 함정]
// - 폴더명에 [] 가 포함되어야 함 (예: app/posts/[slug]/page.tsx)
// - generateStaticParams 가 반환하지 않은 slug 는 기본적으로 요청 시 동적 생성
//   → dynamicParams = false 로 끄면 404 처리
// ─────────────────────────────────────────

import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

// 빌드 타임 prerender 대상.
// 이 함수가 반환한 객체 배열의 각 항목이 한 번씩 prerender 됨.
// 반환은 비동기 가능 (DB/API에서 받아도 OK).
export async function generateStaticParams() {
  return [{ slug: "hello" }, { slug: "world" }];
}

export default async function PostPage({ params }: Props) {
  // params 는 Promise. await 후 destructure.
  const { slug } = await params;
  return (
    <article>
      <h1 className="text-2xl font-bold">동적 라우트 — /{slug}</h1>
      <p className="mt-2 text-[var(--muted)]">
        URL의 마지막 세그먼트가 <code>params.slug</code> 로 들어옵니다.
      </p>
      <p className="mt-4 text-sm">다른 slug 시도:</p>
      <ul className="mt-2 list-disc pl-6">
        <li><Link href="/intermediate/06_dynamic_routes/hello" className="underline">/hello</Link></li>
        <li><Link href="/intermediate/06_dynamic_routes/world" className="underline">/world</Link></li>
        <li><Link href="/intermediate/06_dynamic_routes/foo" className="underline">/foo (동적 생성)</Link></li>
      </ul>
    </article>
  );
}

// 변형:
// app/blog/[...slug]/page.tsx       → /blog/a/b/c → params.slug === ["a","b","c"]
// app/docs/[[...slug]]/page.tsx     → /docs 도 매칭 (optional)
