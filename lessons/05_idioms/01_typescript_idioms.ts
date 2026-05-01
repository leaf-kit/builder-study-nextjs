/**
 * 실행: pnpm tsx lessons/05_idioms/01_typescript_idioms.ts
 */

type Routes = Record<string, { method: "GET" | "POST" }>;

const ROUTES = {
  list: { method: "GET" },
  create: { method: "POST" },
} satisfies Routes;

const STATUSES = ["pending", "ok", "error"] as const;
type Status = (typeof STATUSES)[number];

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function unwrap<T>(r: Result<T>): T {
  if (r.ok) return r.value;
  throw new Error(r.error);
}

type Brand<K, T> = K & { __brand: T };
type UserId = Brand<string, "UserId">;

function greet(id: UserId) {
  return `Hello ${id}`;
}

const userId = "u_42" as UserId;

console.log("ROUTES.list.method:", ROUTES.list.method);
console.log("STATUSES:", STATUSES);
console.log("greet(userId):", greet(userId));
console.log("unwrap ok:", unwrap<number>({ ok: true, value: 7 }));

try {
  unwrap<number>({ ok: false, error: "boom" });
} catch (e) {
  console.log("unwrap err:", (e as Error).message);
}

const status: Status = "ok";
console.log("status:", status);
