# 07. Route Groups + Parallel Routes — 학습 가이드

## Route Group `(name)`

- 폴더명에 괄호 → URL 에 포함되지 않음.
- 용도:
  - **layout 분리**: `(marketing)` 과 `(app)` 이 같은 URL 트리에 속하지만 다른 layout
  - **코드 정리**: 큰 앱에서 도메인별 그룹핑

## Parallel Routes `@slot`

- 같은 layout 이 children 외에도 슬롯 페이지를 동시에 받음
- layout 시그니처:
  ```tsx
  export default function Layout({
    children,
    analytics,
    notifications,
  }: {
    children: React.ReactNode;
    analytics: React.ReactNode;
    notifications: React.ReactNode;
  }) { ... }
  ```
- 슬롯별로 별도 `loading.tsx`, `error.tsx` 가능

## default.tsx

슬롯이 매칭 안 되는 경로일 때 fallback. 슬롯 폴더 안에 `default.tsx` 를 두면 그 슬롯의 기본 콘텐츠로 사용.

## 다음

→ [08_route_handlers](../08_route_handlers/lesson.md)
