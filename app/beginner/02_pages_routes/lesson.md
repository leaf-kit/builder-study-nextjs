# 02. 페이지와 라우트 — 학습 가이드

## 핵심 한 줄

`app/<경로>/page.tsx` 의 **default export 함수**가 그 URL의 페이지가 된다.

## 라우트가 만들어지는 규칙

| 폴더 구조 | URL |
|---|---|
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/posts/list/page.tsx` | `/posts/list` |
| `app/(auth)/login/page.tsx` | `/login` (그룹은 URL에 빠짐) |
| `app/posts/[slug]/page.tsx` | `/posts/:slug` (동적, 06번 토픽) |

## 서버 컴포넌트 = 기본값

App Router에서는 `"use client"`가 없는 모든 컴포넌트가 **서버 컴포넌트**입니다.

- `console.log` → 서버(터미널)에 찍힘
- `useState`, `useEffect` → **사용 불가** (런타임 에러)
- `async` 함수로 만들어 `await fetch(...)` 가능 — 다음 토픽들의 핵심

## 다음

→ [03_layouts](../03_layouts/lesson.md)
