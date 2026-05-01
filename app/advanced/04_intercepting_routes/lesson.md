# 04. Intercepting Routes — 학습 가이드

## 핵심 한 줄

`(.)`, `(..)`, `(...)` 표기로 **다른 경로의 페이지를 현재 layout 안에 끼워서** 렌더한다.

## 표기 의미

| 표기 | 의미 |
|---|---|
| `(.)folder` | 같은 레벨의 폴더 가로채기 |
| `(..)folder` | 한 단계 위 폴더 가로채기 |
| `(..)(..)folder` | 두 단계 위 |
| `(...)folder` | app/ 루트 기준 |

## 모달 라우팅 표준 패턴

1. `app/photo/[id]/page.tsx` — 직접 URL 진입 시 본문 페이지
2. `app/@modal/(.)photo/[id]/page.tsx` — 부모 layout이 살아있는 상태에서 클릭 → 모달로 끼워짐
3. `app/@modal/default.tsx` — 슬롯이 비었을 때 fallback (보통 `null` 반환)
4. `app/layout.tsx` — `{ children, modal }` 둘 다 받아 같이 렌더

## 닫기

```tsx
"use client";
import { useRouter } from "next/navigation";
const router = useRouter();
return <button onClick={() => router.back()}>닫기</button>;
```

## 다음

→ 고급 끝. [04_design_patterns](../../patterns)로.
