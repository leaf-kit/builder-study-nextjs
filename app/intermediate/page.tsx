import Link from "next/link";

const TOPICS = [
  { href: "/intermediate/01_server_components", label: "01 Server Components" },
  { href: "/intermediate/02_client_components", label: "02 Client Components" },
  { href: "/intermediate/03_data_fetching", label: "03 데이터 페칭" },
  { href: "/intermediate/04_loading_streaming", label: "04 로딩과 스트리밍" },
  { href: "/intermediate/05_error_boundaries", label: "05 에러 바운더리" },
  { href: "/intermediate/06_dynamic_routes/hello", label: "06 동적 라우트 ([slug])" },
  { href: "/intermediate/07_route_groups", label: "07 라우트 그룹" },
  { href: "/intermediate/08_route_handlers", label: "08 Route Handlers (API)" },
];

export default function IntermediateIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold">02. 중급</h1>
      <p className="mt-1 text-[var(--muted)]">초급을 마친 뒤 진입.</p>
      <ul className="mt-4 space-y-2">
        {TOPICS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded border border-[var(--border)] px-4 py-3 hover:border-[var(--accent)]"
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
