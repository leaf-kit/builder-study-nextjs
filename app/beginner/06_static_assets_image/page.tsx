import Image from "next/image";

export default function Page() {
  return (
    <article className="space-y-6">
      <h1 className="text-2xl font-bold">06. 정적 자산과 next/image</h1>

      <section>
        <h2 className="text-lg font-semibold">public/ 디렉토리</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          <code>public/</code> 안 파일은 사이트 루트로 노출됩니다. 즉{" "}
          <code>public/logo.svg</code> 는 <code>/logo.svg</code> 로 접근.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">next/image — 외부 이미지</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          외부 도메인은 <code>next.config.ts</code> 의 <code>images.remotePatterns</code> 에 등록되어
          있어야 합니다.
        </p>
        <Image
          src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1280"
          alt="Forest"
          width={640}
          height={360}
          className="mt-2 rounded-lg"
          priority
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold">왜 &lt;img&gt; 대신 next/image?</h2>
        <ul className="mt-1 list-disc pl-6 text-sm">
          <li>자동 포맷 변환 (WebP/AVIF)</li>
          <li>자동 사이즈 변환 + lazy loading</li>
          <li>CLS(누적 레이아웃 시프트) 방지: width/height 강제</li>
        </ul>
      </section>
    </article>
  );
}
