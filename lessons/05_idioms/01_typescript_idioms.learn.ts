// ─────────────────────────────────────────
// 파일명: 01_typescript_idioms.learn.ts
// 토픽: TypeScript 관용구
// 난이도: 관용구
// 학습 시간: ~25분
//
// [실행 방법]
// - VS Code: 이 파일을 열고 F5 (lessons/ 현재 파일 실행 디버그 설정)
// - 터미널: pnpm tsx lessons/05_idioms/01_typescript_idioms.learn.ts
// - raw 버전: 01_typescript_idioms.ts
//
// [무엇을 배우는가]
// 실무에서 자주 만나는 TS 관용구 4가지: satisfies / as const / Discriminated Union / Branded Type
//
// [흔한 함정]
// - satisfies vs as: as 는 강제 캐스트(검증 X), satisfies 는 검증
// - as const 객체는 deep readonly — 변형 시도하면 타입 에러
// ─────────────────────────────────────────

// (A) satisfies
//     "이 값은 이 타입에 부합한다" 를 검증하면서, 추론된 좁은 타입은 유지.
type Routes = Record<string, { method: "GET" | "POST" }>;

const ROUTES = {
  list: { method: "GET" },
  create: { method: "POST" },
  // unknown: { method: "PUT" },   // ❌ "PUT" 은 Routes 에 없음 → 컴파일 에러
} satisfies Routes;

// 만약 `: Routes` 로 타입 표기만 했다면 ROUTES.list.method 의 타입이 "GET" | "POST" 로 넓어짐.
// satisfies 는 검증하면서도 "GET" 같은 리터럴 타입을 보존.

// (B) as const
//     배열/객체를 deep readonly + 리터럴 타입으로 굳힘.
const STATUSES = ["pending", "ok", "error"] as const;
type Status = (typeof STATUSES)[number]; // "pending" | "ok" | "error"

// (C) Discriminated Union
//     공통 키(`ok`)를 기준으로 분기 → 자동 narrowing.
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function unwrap<T>(r: Result<T>): T {
  if (r.ok) return r.value;       // 여기서 r 은 { ok: true; value: T }
  throw new Error(r.error);        // 여기서 r 은 { ok: false; error: string }
}

// (D) Branded Type
//     같은 string 이지만 의도가 다른 식별자를 컴파일러가 구분하도록.
type Brand<K, T> = K & { __brand: T };
type UserId = Brand<string, "UserId">;
type PostId = Brand<string, "PostId">;

function greet(id: UserId) {
  return `Hello ${id}`;
}

const userId = "u_42" as UserId;
const postId = "p_99" as PostId;
// greet(postId);  // ❌ 컴파일 에러 — UserId 가 아님

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

// ─────────────────────────────────────────
// 직접 해보기
// 1) ROUTES 에 { delete: { method: "DELETE" } } 를 추가해 보세요.
//    → "DELETE" 는 Routes 의 method 유니언에 없어서 에러.
// 2) Result<T> 에 세 번째 케이스 { ok: "loading" } 을 추가하면 어떻게 되나?
//    → narrowing 이 깨져서 unwrap 안에서 if/else if 추가 필요.
// 3) UserId 와 PostId 를 같은 문자열에 동시에 cast 하면?
//    → as 는 강제 캐스트라 가능하지만 의도적으로 위험. 보통 생성자 함수로 좁힘:
//      function asUserId(s: string): UserId { /* validate */ return s as UserId; }
// ─────────────────────────────────────────
