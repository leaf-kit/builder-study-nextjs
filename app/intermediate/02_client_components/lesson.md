# 02. Client Components — 학습 가이드

## 한 줄

`"use client"` 가 파일 맨 위에 있으면 그 파일과 그 파일이 import 하는 모든 컴포넌트가 클라이언트로 내려간다.

## 경계 그리기 원칙

1. **leaf 부터 client** — 페이지 전체가 아니라 인터랙티브한 가장 작은 단위만.
2. **server → client props 는 직렬화 가능해야** — primitive, 배열/객체, Date, Promise, Server Action 만 OK.
3. **client → server import 는 안 됨** — 정확히는, 서버 컴포넌트를 client에서 직접 import 하는 것은 안 되지만 children 으로 받는 건 OK.

## 자주 쓰는 패턴: children 패턴

```tsx
// 클라이언트 컴포넌트지만 서버 컴포넌트를 children 으로 받기
"use client";
export function Toggle({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return open ? <div>{children}</div> : <button onClick={() => setOpen(true)}>열기</button>;
}
```

```tsx
// 서버 컴포넌트가 위 Toggle 을 사용하면서 서버 컴포넌트를 children 으로 주입
<Toggle>
  <ServerOnlyData />
</Toggle>
```

## 다음

→ [03_data_fetching](../03_data_fetching/lesson.md)
