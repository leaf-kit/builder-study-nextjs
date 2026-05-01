import Link from "next/link";

const TOPICS = [
  { href: "/advanced/01_caching_revalidation", label: "01 캐시와 재검증" },
  { href: "/advanced/02_server_actions", label: "02 Server Actions" },
  { href: "/advanced/03_middleware", label: "03 Middleware" },
  { href: "/advanced/04_intercepting_routes", label: "04 Intercepting Routes" },
];

export default function AdvancedIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold">03. 고급</h1>
      <p className="mt-1 text-[var(--muted)]">중급을 마친 뒤 진입.</p>
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
