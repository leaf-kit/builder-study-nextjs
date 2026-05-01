import Link from "next/link";

const TOPICS = [
  { href: "/patterns/01_container_presenter", label: "01 Container/Presenter (RSC↔Client 분리)" },
  { href: "/patterns/02_data_access_layer", label: "02 Data Access Layer (DAL)" },
];

export default function PatternsIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold">04. 디자인 패턴</h1>
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
