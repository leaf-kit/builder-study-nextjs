# 05. 스타일링 — 학습 가이드

## 한 줄 요약

| 방식 | 언제 쓰나 |
|---|---|
| Tailwind | 새 프로젝트 표준. 빠르고 디자인 토큰화 자연스러움 |
| CSS Modules | 컴포넌트 스코프 CSS. 기존 SCSS 자산 이전 시 |
| 인라인 | 동적 색상/크기 (예: 사용자 입력값으로 결정) |
| globals.css | reset, CSS 변수, 폰트만 |

## 자주 묻는 것

- **Tailwind 클래스가 너무 길어진다** → `clsx` 또는 디자인 토큰화된 컴포넌트로 추출.
- **다크모드** → 본 저장소는 `prefers-color-scheme` 기반. 토글 UI는 클라이언트 컴포넌트로 별도 구현 필요.
- **CSS-in-JS (styled-components, emotion)** → RSC와 호환 이슈가 있어 신중. App Router에서는 Tailwind/CSS Modules가 안전.

## 다음

→ [06_static_assets_image](../06_static_assets_image/lesson.md)
