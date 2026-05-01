# 01. TypeScript 관용구 — 학습 가이드

## 핵심 4가지

| 관용구 | 한 줄 |
|---|---|
| `satisfies` | 타입 부합 검증을 하면서 좁은 타입을 보존 |
| `as const` | 객체/배열을 deep readonly + 리터럴 타입화 |
| Discriminated Union | 공통 키로 분기 → 자동 narrowing |
| Branded Type | 같은 primitive 를 의도적으로 분리 |

## 실제 실행

```bash
pnpm tsx lessons/05_idioms/01_typescript_idioms.ts
pnpm tsx lessons/05_idioms/01_typescript_idioms.learn.ts
# 두 출력이 동일해야 함
```

## 더 깊이

- `Pick`, `Omit`, `Partial`, `Required`, `ReturnType`, `Awaited` — 빌트인 유틸
- `infer` — 조건부 타입 안에서 타입 추출
- `noUncheckedIndexedAccess` — `arr[0]: T | undefined` 강제

## 다음

→ [02_nextjs](../02_nextjs/lesson.md)
