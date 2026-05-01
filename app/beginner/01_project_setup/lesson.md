# 01. 프로젝트 셋업 — 학습 가이드

> raw: `page.tsx` · learn: `page.learn.tsx` · 라우트: `/beginner/01_project_setup`

## 학습 목표

- Next.js 프로젝트의 표준 디렉토리 구조를 본다.
- 어떤 파일이 어떤 역할을 하는지 안다.
- `pnpm dev`로 한 번 실행해 본다.

## 핵심 개념

### `app/` vs 옛날 `pages/`

- **App Router (`app/`)** — Next.js 13+의 기본. RSC, Server Actions, 중첩 layout 지원.
- **Pages Router (`pages/`)** — 옛 방식. 새 프로젝트에서는 쓰지 않음.

본 저장소는 App Router 전용입니다.

### `next.config.ts` 의 핵심 옵션

```ts
const nextConfig: NextConfig = {
  reactStrictMode: true,              // 개발 시 부수 효과 검출
  images: { remotePatterns: [...] },  // next/image가 허용할 외부 도메인
  experimental: { typedRoutes: true } // <Link href="..."> 타입 체크
};
```

### `tsconfig.json` 의 핵심 옵션

| 옵션 | 의미 |
|---|---|
| `strict` | 모든 strict 플래그 켜기 |
| `noUncheckedIndexedAccess` | `arr[0]`을 `T \| undefined`로 추론 |
| `paths: { "@/*": ["./*"] }` | `import x from "@/lib/x"` 별칭 |

## 흔한 실수

- `pnpm` 이 없다 → `corepack enable pnpm` 또는 `npm i -g pnpm`
- `Cannot find module 'next'` → `pnpm install`을 안 했다
- 포트 3000 충돌 → `PORT=3001 pnpm dev`

## 다음

→ [02_pages_routes](../02_pages_routes/lesson.md)
