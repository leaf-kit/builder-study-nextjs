import Link from "next/link";

const TOPICS = [
  { href: "/idioms/01_typescript", label: "01 TypeScript 관용구" },
  { href: "/idioms/02_nextjs", label: "02 Next.js 관용구 (server-only / env / 등)" },
];

export default function IdiomsIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold">05. 관용구</h1>
      <p className="mt-1 text-[var(--muted)]">
        문법은 알아도 "잘 짠 코드"가 안 보일 때 읽으세요.
      </p>
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
