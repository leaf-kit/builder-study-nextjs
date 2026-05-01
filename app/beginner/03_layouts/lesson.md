# 03. 레이아웃 — 학습 가이드

## 핵심 한 줄

`layout.tsx` 의 default export 는 **자식 라우트를 children으로 감싸는** 컴포넌트.

## 동작

1. URL이 `/a/b/c` 일 때, Next.js는 `app/a/layout` → `app/a/b/layout` → `app/a/b/c/layout` 을 순서대로 중첩하여 렌더링.
2. 자식 라우트가 바뀌어도 **그 자식 라우트의 부모 layout은 리마운트되지 않음**.
3. 즉 layout 안의 상태(클라이언트 컴포넌트라면)와 스크롤 위치가 보존된다.

## 시그니처

```tsx
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
```

## 흔히 헷갈리는 것

| | `layout.tsx` | `template.tsx` |
|---|---|---|
| 매 네비게이션마다 리마운트 | ❌ | ✅ |
| 상태 유지 | ✅ | ❌ |
| 언제 쓰나 | 거의 항상 | 페이지 진입 애니메이션 등 |

## 다음

→ [04_link_navigation](../04_link_navigation/lesson.md)
