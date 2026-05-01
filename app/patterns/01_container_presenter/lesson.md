# 01. Container / Presenter — 학습 가이드

> 옛 Redux 시대의 Container/Presenter 와 이름은 같으나, RSC 시대에는 **서버 컴포넌트 / 클라이언트 컴포넌트** 분리로 자연스럽게 구현.

## 책임 분리

| 컴포넌트 | 책임 | 환경 |
|---|---|---|
| Container | 데이터 페칭, 권한, 비즈니스 | 서버 (RSC) |
| Presenter | UI 렌더링, 사용자 인터랙션 | 클라이언트 |

## 권장 디렉토리 구조

```
app/products/[id]/
├── page.tsx              ← Container (서버)
├── product-presenter.tsx ← Presenter (클라이언트, "use client")
└── actions.ts            ← Server Actions (필요 시)
```

## 함정

- **Presenter 가 비대해지는 것**: 인터랙션이 늘어나면 작은 컴포넌트로 더 쪼개기.
- **데이터 형식 결정을 Container 에서 안 하는 것**: 화면이 쓰지 않는 필드를 전부 넘기면 번들/네트워크 낭비.

## 다음

→ [02_data_access_layer](../02_data_access_layer/lesson.md)
