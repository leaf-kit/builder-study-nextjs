# 02. Next.js 관용구 — 학습 가이드

## 안 다루지만 알아야 할 것들

- `<noscript>` fallback — 자바스크립트가 꺼진 사용자
- `Image` 의 placeholder="blur" — 정적 import 시 자동 blur 이미지
- `notFound()` 와 `redirect()` 의 차이 — 둘 다 `never` 반환

## 자주 쓰는 작은 패턴

### 1) layout 안에서 dynamic API 안 쓰기

```tsx
// ❌ Bad — layout 이 cookies() 를 호출하면 자식 모든 라우트가 동적
export default async function Layout() {
  const user = (await cookies()).get("session");
  // ...
}

// ✅ Good — 필요한 페이지에서만 호출
```

### 2) 클라이언트 컴포넌트에 서버 데이터 던지기

서버 컴포넌트가 클라이언트 컴포넌트에 props 로 데이터를 주입하는 것이 자연스러운 흐름. 클라이언트가 useEffect로 다시 fetch 하는 SPA 습관을 버리는 것이 핵심.

### 3) 폼은 가능하면 progressive enhancement

```tsx
<form action={action}>...</form>   // JS 꺼져도 동작
```

`onSubmit` + `preventDefault` 로 처리하는 옛 방식보다 `action={fn}` 방식이 우선.

## 다음

→ [06_for_prompt_builders](../../builders)로.
