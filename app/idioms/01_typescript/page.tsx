export default function Page() {
  return (
    <article className="prose max-w-none">
      <h1 className="text-2xl font-bold">01. TypeScript 관용구</h1>
      <p className="mt-2 text-[var(--muted)]">
        문법은 알아도 "잘 짠 TS 코드" 가 잘 안 보일 때 펴보세요. 실제 동작은{" "}
        <code>lessons/05_idioms/01_typescript_idioms.ts</code> 에서 실행해 봅니다.
      </p>

      <h2 className="mt-6 text-lg font-semibold">A) <code>satisfies</code> — 좁은 타입 + 넓은 검증</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`type Routes = Record<string, { method: "GET" | "POST" }>;

// satisfies: 객체 리터럴이 Routes 에 부합하는지 검증하면서
//            value 의 정확한 좁은 타입은 유지.
const ROUTES = {
  list: { method: "GET" },
  create: { method: "POST" },
} satisfies Routes;

ROUTES.list.method;   // "GET" (리터럴 타입 보존)
// ROUTES.unknown    // ❌ 컴파일 에러`}
      </pre>

      <h2 className="mt-6 text-lg font-semibold">B) <code>as const</code> — 리터럴 보존</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`const STATUSES = ["pending", "ok", "error"] as const;
type Status = (typeof STATUSES)[number];   // "pending" | "ok" | "error"`}
      </pre>

      <h2 className="mt-6 text-lg font-semibold">C) Discriminated Union</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function unwrap<T>(r: Result<T>): T {
  if (r.ok) return r.value;
  throw new Error(r.error);
}`}
      </pre>

      <h2 className="mt-6 text-lg font-semibold">D) Branded Type — 의미가 같은 string 분리</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`type Brand<K, T> = K & { __brand: T };
type UserId = Brand<string, "UserId">;
type PostId = Brand<string, "PostId">;

function getUser(id: UserId) { /* ... */ }
const pid = "p_123" as PostId;
// getUser(pid);  ❌ 컴파일 에러 — 같은 string 이지만 다른 타입`}
      </pre>
    </article>
  );
}
