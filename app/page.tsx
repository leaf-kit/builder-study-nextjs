import Link from "next/link";

type Section = {
  href: string;
  title: string;
  desc: string;
  topics: { href: string; label: string }[];
};

const SECTIONS: Section[] = [
  {
    href: "/beginner",
    title: "01. 초급",
    desc: "프로젝트 셋업부터 라우팅·레이아웃·스타일링·메타데이터까지.",
    topics: [
      { href: "/beginner/01_project_setup", label: "01 프로젝트 셋업" },
      { href: "/beginner/02_pages_routes", label: "02 페이지와 라우트" },
      { href: "/beginner/03_layouts", label: "03 레이아웃" },
      { href: "/beginner/04_link_navigation", label: "04 링크와 네비게이션" },
      { href: "/beginner/05_styling", label: "05 스타일링" },
      { href: "/beginner/06_static_assets_image", label: "06 정적 자산과 next/image" },
      { href: "/beginner/07_metadata_seo", label: "07 Metadata와 SEO" },
      { href: "/beginner/08_typescript_props", label: "08 TS Props/params" },
    ],
  },
  {
    href: "/intermediate",
    title: "02. 중급",
    desc: "RSC·Client Component·데이터 페칭·스트리밍·동적 라우트·API.",
    topics: [
      { href: "/intermediate/01_server_components", label: "01 Server Components" },
      { href: "/intermediate/02_client_components", label: "02 Client Components" },
      { href: "/intermediate/03_data_fetching", label: "03 데이터 페칭" },
      { href: "/intermediate/04_loading_streaming", label: "04 로딩/스트리밍" },
      { href: "/intermediate/05_error_boundaries", label: "05 에러 바운더리" },
      { href: "/intermediate/06_dynamic_routes/hello", label: "06 동적 라우트" },
      { href: "/intermediate/07_route_groups", label: "07 라우트 그룹" },
      { href: "/intermediate/08_route_handlers", label: "08 Route Handlers" },
    ],
  },
  {
    href: "/advanced",
    title: "03. 고급",
    desc: "캐시·재검증·Server Actions·Middleware·Intercepting Routes.",
    topics: [
      { href: "/advanced/01_caching_revalidation", label: "01 캐시와 재검증" },
      { href: "/advanced/02_server_actions", label: "02 Server Actions" },
      { href: "/advanced/03_middleware", label: "03 Middleware" },
      { href: "/advanced/04_intercepting_routes", label: "04 Intercepting Routes" },
    ],
  },
  {
    href: "/patterns",
    title: "04. 디자인 패턴",
    desc: "Container/Presenter, Data Access Layer.",
    topics: [
      { href: "/patterns/01_container_presenter", label: "01 Container/Presenter" },
      { href: "/patterns/02_data_access_layer", label: "02 DAL 패턴" },
    ],
  },
  {
    href: "/idioms",
    title: "05. 관용구",
    desc: "TypeScript / Next.js다움.",
    topics: [
      { href: "/idioms/01_typescript", label: "01 TS 관용구" },
      { href: "/idioms/02_nextjs", label: "02 Next.js 관용구" },
    ],
  },
  {
    href: "/builders",
    title: "06. 프롬프트 빌더 트랙",
    desc: "Next.js로 LLM 앱을 짤 때의 패턴 (Claude API 기반).",
    topics: [
      { href: "/builders/01_streaming_llm", label: "01 스트리밍 LLM" },
      { href: "/builders/02_server_action_llm", label: "02 Server Action으로 LLM 호출" },
      { href: "/builders/03_structured_outputs", label: "03 Zod로 구조화 출력" },
      { href: "/builders/04_rag_skeleton", label: "04 RAG 골격" },
      { href: "/builders/05_tool_use", label: "05 Tool Use 패턴" },
    ],
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold">Next.js Study</h1>
        <p className="mt-2 text-[var(--muted)]">
          App Router + TypeScript + Tailwind 기반 학습 저장소. 각 토픽은{" "}
          <code>page.tsx</code> (raw) + <code>page.learn.tsx</code> (주석 가득) +{" "}
          <code>lesson.md</code> 세 파일로 구성됩니다.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          → 처음이라면{" "}
          <Link className="text-[var(--accent)] underline" href="/beginner/01_project_setup">
            beginner/01_project_setup
          </Link>{" "}
          부터 시작하세요.
        </p>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.href}>
          <h2 className="text-xl font-semibold">
            <Link href={s.href} className="hover:underline">
              {s.title}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{s.desc}</p>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {s.topics.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="block rounded border border-[var(--border)] px-3 py-2 text-sm hover:border-[var(--accent)]"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
