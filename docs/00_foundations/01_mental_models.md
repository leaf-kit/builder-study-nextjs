# 01. 다섯 가지 멘탈 모델

> Next.js를 빨리 익히는 가장 빠른 길은 문법을 외우는 것이 아니라, 프레임워크가 세상을 어떻게 보는지 따라 보는 것입니다.

---

## M1. Server Components 우선 (RSC-first)

App Router에서는 **모든 컴포넌트가 기본적으로 서버 컴포넌트**입니다.

```tsx
// app/posts/page.tsx — 기본은 서버 컴포넌트
export default async function PostsPage() {
  const posts = await fetch("https://api.example.com/posts").then((r) => r.json());
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

- 브라우저에는 위 컴포넌트의 자바스크립트가 **하나도 가지 않습니다**. HTML/직렬화된 트리만 갑니다.
- 따라서 `useState`, `useEffect`, `onClick` 같은 브라우저 전용 API를 못 씁니다.
- 그게 필요하면 파일 맨 위에 `"use client"` 한 줄을 적어 클라이언트 컴포넌트로 내려옵니다.

**머릿속 바꾸기**:
- "리액트인데 useState를 못 쓴다"가 기본값이라는 것
- "필요할 때만 클라이언트로 내려간다" — 인터랙션 영역만 작게.

---

## M2. 파일 시스템이 곧 라우팅이다

`app/` 디렉토리 구조 = URL 구조. 폴더에 들어가는 특수 파일명이 의미를 가집니다.

```
app/
├── layout.tsx              → 모든 라우트의 최상위 레이아웃
├── page.tsx                → /
├── about/
│   └── page.tsx            → /about
├── posts/
│   ├── page.tsx            → /posts
│   ├── loading.tsx         → /posts 로딩 중 fallback
│   ├── error.tsx           → /posts 에러 boundary
│   └── [slug]/
│       └── page.tsx        → /posts/:slug (동적)
└── api/
    └── health/
        └── route.ts        → GET /api/health
```

특수 파일명 표:

| 파일 | 역할 |
|---|---|
| `page.tsx` | 라우트 진입 |
| `layout.tsx` | 자식 라우트를 감싸는 레이아웃 (상태 유지) |
| `template.tsx` | layout과 비슷하나 매 네비게이션마다 새로 마운트 |
| `loading.tsx` | Suspense fallback |
| `error.tsx` | Error Boundary |
| `not-found.tsx` | 404 |
| `route.ts` | API 핸들러 (HTTP 메서드별 export) |
| `[slug]/` | 동적 세그먼트 |
| `[...slug]/` | catch-all |
| `[[...slug]]/` | optional catch-all |
| `(group)/` | URL에 포함되지 않는 그룹 |
| `@slot/` | parallel route slot |
| `(.)folder` | intercepting route |

---

## M3. 렌더링은 4겹 캐시의 결과물

요청 한 번이 화면이 되기까지 4개 캐시가 동시에 작동합니다.

```
[Request Memoization]   ─ 한 요청 안에서 같은 fetch 중복 제거 (메모리)
       ↓
[Data Cache]            ─ fetch 결과의 영속 캐시 (revalidate, tags)
       ↓
[Full Route Cache]      ─ 라우트의 HTML/RSC payload (정적 라우트)
       ↓
[Router Cache]          ─ 브라우저 측 클라이언트 라우터 캐시 (네비게이션)
```

캐시 동작을 결정하는 요소:

- `fetch(url, { cache: "no-store" | "force-cache", next: { revalidate, tags } })`
- `export const dynamic = "force-dynamic" | "force-static" | "auto"`
- `export const revalidate = <초>`
- `cookies()`, `headers()`, `searchParams` 사용 → 자동으로 동적 렌더로 전환
- `revalidatePath(path)`, `revalidateTag(tag)` — 뮤테이션 후 캐시 무효화

> 이 모델이 헷갈리면 `03_advanced/01_caching_revalidation`에서 시각화와 함께 다시 봅니다.

---

## M4. TypeScript는 Props/Params/Search의 계약

Next.js 15+에서 페이지 props는 **Promise**로 받습니다 (비동기 라우팅).

```tsx
// app/posts/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;
  return <article>{slug}</article>;
}
```

- `params`: 동적 세그먼트 값
- `searchParams`: URL 쿼리스트링
- Layout은 `params` + `children`을 받음
- API Route는 `NextRequest` + 두 번째 인자로 `{ params }`

Next.js는 `experimental.typedRoutes`를 켜면 `<Link href="...">`도 타입체크합니다.

---

## M5. Server Actions = RPC

폼 제출 / 뮤테이션을 별도 API 라우트 없이 함수 호출로 처리합니다.

```tsx
// app/posts/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  await db.post.create({ data: { title } });
  revalidatePath("/posts");
}
```

```tsx
// app/posts/page.tsx
import { createPost } from "./actions";

export default function Page() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button>저장</button>
    </form>
  );
}
```

- `"use server"`는 함수가 **클라이언트에서 직접 호출 가능한 RPC 엔드포인트**임을 선언합니다.
- 자바스크립트가 꺼져 있어도 폼이 동작합니다 (progressive enhancement).
- 호출 직후 `revalidatePath`로 캐시 무효화 → UI 자동 갱신.

> Server Actions는 `03_advanced/02_server_actions`에서 깊이 다룹니다.

---

## 다섯 모델이 충돌할 때

이 다섯이 서로 부딪히는 순간이 실무에서 자주 옵니다. 예:

- M1 (RSC) × M3 (캐시): 서버 컴포넌트가 `cookies()`를 읽으면 → M3의 Full Route Cache가 즉시 비활성화 → 매 요청 동적 렌더
- M5 (Server Action) × M3 (캐시): 액션 후 `revalidatePath`를 안 부르면 → 화면이 안 바뀜 (캐시 살아있음)
- M1 × M2: `loading.tsx`는 자동으로 자식 RSC를 `<Suspense>`로 감싼다 — `02_intermediate/04_loading_streaming`에서 확인

이 충돌 지점을 알면 본인이 짠 코드의 동작을 예측할 수 있습니다.
