import Link from "next/link";

const TOPICS = [
  { href: "/beginner/01_project_setup", label: "01 프로젝트 셋업", desc: "디렉토리 의미와 첫 실행" },
  { href: "/beginner/02_pages_routes", label: "02 페이지와 라우트", desc: "page.tsx 한 장에서 시작" },
  { href: "/beginner/03_layouts", label: "03 레이아웃", desc: "중첩 layout과 상태 보존" },
  { href: "/beginner/04_link_navigation", label: "04 링크와 네비게이션", desc: "<Link> vs useRouter" },
  { href: "/beginner/05_styling", label: "05 스타일링", desc: "Tailwind / CSS Module / global" },
  { href: "/beginner/06_static_assets_image", label: "06 정적 자산", desc: "public/ + next/image" },
  { href: "/beginner/07_metadata_seo", label: "07 Metadata", desc: "SEO와 OG 태그" },
  { href: "/beginner/08_typescript_props", label: "08 TS Props", desc: "params/searchParams 타입" },
];

export default function BeginnerIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold">01. 초급</h1>
      <p className="mt-1 text-[var(--muted)]">위에서 아래로 순서대로 진행하세요.</p>
      <ul className="mt-4 space-y-2">
        {TOPICS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded border border-[var(--border)] px-4 py-3 hover:border-[var(--accent)]"
            >
              <div className="font-medium">{t.label}</div>
              <div className="text-sm text-[var(--muted)]">{t.desc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
