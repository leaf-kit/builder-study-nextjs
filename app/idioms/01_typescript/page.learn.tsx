// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: TS 관용구 (페이지 표시용)
// 실행 가능한 파일: lessons/05_idioms/01_typescript_idioms.learn.ts
// ─────────────────────────────────────────

export default function Page() {
  return (
    <article className="prose max-w-none">
      <h1 className="text-2xl font-bold">01. TypeScript 관용구</h1>
      <p className="mt-2 text-[var(--muted)]">
        문법은 알아도 "잘 짠 TS 코드" 가 잘 안 보일 때 펴보세요. 실제 동작은{" "}
        <code>lessons/05_idioms/01_typescript_idioms.ts</code> 에서 실행해 봅니다.
      </p>

      {/* 본 페이지의 본문은 raw 버전과 동일 — 학습 헤더만 추가 */}
      <h2 className="mt-6 text-lg font-semibold">A) satisfies — 좁은 타입 + 넓은 검증</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`type Routes = Record<string, { method: "GET" | "POST" }>;
const ROUTES = { list: { method: "GET" }, create: { method: "POST" } } satisfies Routes;
ROUTES.list.method;   // "GET" 보존`}
      </pre>

      <h2 className="mt-6 text-lg font-semibold">B) as const</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`const STATUSES = ["pending", "ok", "error"] as const;
type Status = (typeof STATUSES)[number];`}
      </pre>

      <h2 className="mt-6 text-lg font-semibold">C) Discriminated Union</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`type Result<T> = { ok: true; value: T } | { ok: false; error: string };`}
      </pre>

      <h2 className="mt-6 text-lg font-semibold">D) Branded Type</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`type Brand<K, T> = K & { __brand: T };
type UserId = Brand<string, "UserId">;`}
      </pre>
    </article>
  );
}
