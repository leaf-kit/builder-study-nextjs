# 04. 로딩과 스트리밍 — 학습 가이드

## 두 가지 fallback 방법

| | 적용 범위 | 사용처 |
|---|---|---|
| `loading.tsx` | 그 라우트 세그먼트의 page 트리 전체 | 페이지 진입 시 한 번 |
| `<Suspense fallback>` | 그 컴포넌트 자식 트리만 | 부분 스트리밍 |

## 흐름

```
요청 도착
  ↓
서버: shell HTML(레이아웃, 정적 부분) 즉시 전송 + Suspense 경계 fallback
  ↓
서버: 각 async 컴포넌트가 끝날 때마다 결과를 stream 으로 추가 전송
  ↓
브라우저: HTML 청크가 도착할 때마다 fallback 을 실제 콘텐츠로 교체
```

## 패턴: 페이지 골격은 즉시, 무거운 부분은 스트리밍

```tsx
export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <ExpensiveDashboard />
      </Suspense>
    </>
  );
}
```

## 다음

→ [05_error_boundaries](../05_error_boundaries/lesson.md)
