import { listVisibleNotes } from "@/lib/notes-dal";

export default async function Page() {
  const notes = await listVisibleNotes("alice");
  return (
    <article>
      <h1 className="text-2xl font-bold">02. Data Access Layer (DAL)</h1>
      <p className="mt-2 text-[var(--muted)]">
        모든 데이터 접근은 <code>lib/notes-dal.ts</code> 의 함수를 통해서만 합니다. 권한 검증, 캐시
        키, 데이터 정제가 한곳에 모여 있습니다.
      </p>
      <ul className="mt-4 space-y-1">
        {notes.map((n) => (
          <li
            key={n.id}
            className="rounded border border-[var(--border)] px-3 py-2 text-sm"
          >
            <strong>{n.title}</strong>{" "}
            <span className="text-[var(--muted)]">— {n.excerpt}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
