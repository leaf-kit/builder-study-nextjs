# 02. 런타임 모델 — 코드는 어디서 도는가

> "이 코드 어디서 실행되지?" 라는 질문에 즉답할 수 있어야 합니다. 답에 따라 쓸 수 있는 API가 완전히 다릅니다.

---

## 세 가지 실행 환경

Next.js 코드는 다음 셋 중 하나에서 실행됩니다.

### 1. **Node.js 런타임 (서버)**
- 기본값. 모든 Server Component, Server Action, Route Handler가 여기서 돈다.
- `fs`, `path`, `process.env` 같은 Node API 자유 사용.
- 데이터베이스 드라이버, 무거운 npm 패키지 OK.
- 응답 시작이 약간 느릴 수 있음 (cold start).

### 2. **Edge 런타임 (서버, V8 isolate)**
- Vercel Edge Functions, Cloudflare Workers 등이 표적.
- Node API가 **거의 없다**. `fs`, `child_process`, `crypto` 일부, `Buffer`도 제한.
- Web 표준 API (`fetch`, `Request`, `Response`, `URL`, `Crypto`)를 씀.
- cold start이 매우 짧음 (수 ms).
- 옵트인:
  ```ts
  export const runtime = "edge";
  ```
- `middleware.ts`는 **항상 Edge 런타임**.

### 3. **브라우저 (클라이언트)**
- `"use client"`가 붙은 컴포넌트와 그 자식 컴포넌트의 자바스크립트가 번들로 가서 거기서 실행.
- `window`, `document`, `localStorage` OK.
- `useState`, `useEffect`, 이벤트 핸들러 OK.

---

## 결정 흐름도

```
이 코드는 어디서 도는가?

파일 맨 위에 "use client"가 있는가?
├─ 예 → 브라우저 (CSR) + 초기엔 서버에서 한 번 SSR 됨
└─ 아니오 →
    └─ 같은 파일 안에 export const runtime = "edge"가 있는가?
        ├─ 예 → Edge 런타임
        └─ 아니오 → Node.js 런타임 (기본)
```

> `middleware.ts`만 예외 — 항상 Edge.

---

## 서버/클라이언트 경계의 직렬화 규칙

서버 컴포넌트가 클라이언트 컴포넌트에 props를 넘길 때, **직렬화 가능한 값만** 넘길 수 있습니다.

| 넘길 수 있다 | 넘길 수 없다 |
|---|---|
| primitive (`string`, `number`, `boolean`, `null`, `undefined`) | 함수 (예외: Server Action) |
| `Date`, `BigInt`, `RegExp`, `Map`, `Set`, `URL` | class 인스턴스 |
| 위 타입의 배열/객체 | symbol (전역 symbol 제외) |
| Promise (서버에서 시작 → 클라가 await) | DOM 노드 |
| **Server Action 함수** (특수 직렬화) | 일반 함수 / 클로저 |

```tsx
// app/page.tsx (서버)
import ClientButton from "./client-button";

async function onSave(formData: FormData) {
  "use server";
  // ...
}

export default function Page() {
  // ✅ 서버 액션은 직렬화 가능 (특수 처리)
  // ❌ 일반 클로저는 못 넘김
  return <ClientButton action={onSave} />;
}
```

---

## 환경 변수 노출 규칙

`process.env.X`의 값은:

| 어디서 읽는가 | 변수 형태 | 결과 |
|---|---|---|
| 서버 (Node/Edge) | 모든 변수 | 정상 읽힘 |
| 브라우저 | `NEXT_PUBLIC_X` | 빌드 시점에 인라인됨 (값이 번들에 박힘) |
| 브라우저 | `X` (접두사 없음) | `undefined` |

**결과**:
- API 키, DB 비밀번호 → 절대로 `NEXT_PUBLIC_` 접두사를 붙이지 마세요.
- 클라이언트가 알아도 되는 값(앱 이름, 분석 ID)만 `NEXT_PUBLIC_`.

---

## "use server" vs "use client"

이름이 거의 비슷해서 헷갈립니다.

| 지시문 | 의미 | 위치 |
|---|---|---|
| `"use client"` | 이 파일과 자식 import 트리는 **클라이언트 컴포넌트** | 파일 맨 위 |
| `"use server"` | 이 파일/이 함수는 **서버에서만 실행되는 RPC 엔드포인트** | 파일 맨 위 또는 함수 맨 위 |

**두 지시문은 정반대 방향입니다.** `"use server"`는 "이 함수는 클라이언트가 호출할 수 있는 서버 함수"라는 뜻이고, `"use client"`는 "이 컴포넌트는 클라이언트에서 동작한다"는 뜻입니다.

---

## 흔한 함정

- **`"use client"` 컴포넌트 안에서 `process.env.SECRET`을 쓰면 빌드 에러**: 클라이언트로 전송될 코드가 서버 비밀에 접근할 수 없음.
- **서버 컴포넌트에서 `localStorage`를 쓰면 런타임 에러**: 서버에는 그 객체가 없음.
- **서버 액션을 클라이언트 컴포넌트에서 정의하려 하면 안 됨**: 액션은 반드시 별도 파일(`actions.ts`) 또는 서버 컴포넌트 안에서 정의.

---

## 실전 결정 가이드

> "이 컴포넌트는 서버일까 클라이언트일까?"

다음 중 하나라도 true이면 클라이언트 컴포넌트 (`"use client"`):

- [ ] `useState` / `useEffect` / `useMemo` / `useRef` / `useReducer`를 쓴다
- [ ] `onClick`, `onChange`, `onSubmit` 같은 이벤트 핸들러가 있다
- [ ] 브라우저 전용 API (`window`, `localStorage`, `IntersectionObserver`)를 쓴다
- [ ] 외부 라이브러리가 위 셋 중 하나를 사용한다 (예: 차트 라이브러리)

그 외에는 전부 서버 컴포넌트가 더 가볍고 빠릅니다.
