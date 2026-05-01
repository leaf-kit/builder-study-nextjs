import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metadata 데모",
  description: "Next.js Metadata API의 기본 사용법.",
  openGraph: {
    title: "Metadata 데모 — Next.js Study",
    description: "OG 태그가 자동 생성됩니다.",
    type: "article",
  },
  robots: { index: true, follow: true },
};

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
