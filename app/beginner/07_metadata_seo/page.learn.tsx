// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 07 Metadata와 SEO
// 난이도: 초급
// 학습 시간: ~10분
//
// [무엇을 배우는가]
// - 정적 metadata export
// - generateMetadata (동적, 06_dynamic_routes 와 결합)
// - Layout 의 metadata 와 Page 의 metadata 가 병합되는 규칙
//
// [흔한 함정]
// - "use client" 컴포넌트에서는 metadata export 가 무시됨 (서버 전용)
// - generateMetadata 는 async 가능, 같은 페이지의 fetch 와 메모이제이션 공유
// ─────────────────────────────────────────

import type { Metadata } from "next";
// ↑ Next.js 가 제공하는 Metadata 타입. 자동 완성과 잘못된 키 컴파일 에러를 잡아준다.

// 정적 metadata: 빌드 타임에 결정됨.
// Next.js 는 이 export 를 발견하면 페이지 <head>에 자동으로 태그를 주입.
export const metadata: Metadata = {
  title: "Metadata 데모",
  description: "Next.js Metadata API의 기본 사용법.",
  openGraph: {
    title: "Metadata 데모 — Next.js Study",
    description: "OG 태그가 자동 생성됩니다.",
    type: "article",
  },
  robots: { index: true, follow: true },
  // 이 외에도 twitter, alternates, icons, manifest 등 거의 모든 SEO 메타데이터 지원
};

// 참고: 동적 메타데이터 (예: 게시글 제목)는 다음과 같이.
// export async function generateMetadata({ params }): Promise<Metadata> {
//   const post = await getPost((await params).slug);
//   return { title: post.title };
// }

export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">07. Metadata와 SEO</h1>
      <p className="mt-2 text-[var(--muted)]">
        브라우저 탭 제목, 미리보기 OG 태그 모두 위 <code>metadata</code> export 만으로 끝.
      </p>
      <p className="mt-2 text-sm">
        DevTools → Elements → <code>&lt;head&gt;</code> 안에서 <code>og:title</code> 등을 확인하세요.
      </p>
    </article>
  );
}
