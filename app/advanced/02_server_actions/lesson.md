# 02. Server Actions — 학습 가이드

## 정의

`"use server"` 가 붙은 함수는 **클라이언트에서 호출 가능한 서버 함수**가 된다. 별도 API 라우트 없이 폼/뮤테이션을 처리.

## 두 가지 선언 방식

```ts
// 방법 1) 파일 전체를 액션 모듈로
"use server";
export async function createPost(formData: FormData) { ... }
```

```tsx
// 방법 2) 컴포넌트 안에서 인라인
export default function Page() {
  async function action(formData: FormData) {
    "use server";
    // ...
  }
  return <form action={action}>...</form>;
}
```

## 호출 방법

```tsx
// (a) 폼 action 으로
<form action={createPost}>...</form>

// (b) 클라이언트 컴포넌트에서 직접 호출
"use client";
import { createPost } from "./actions";
const handle = async () => { await createPost(new FormData()); };
```

## .bind 로 인자 전달

```tsx
<form action={deleteTodo.bind(null, t.id)}>
  <button>삭제</button>
</form>
```

## 입력 검증 (필수)

```ts
"use server";
import { z } from "zod";

const Schema = z.object({ title: z.string().min(1).max(80) });

export async function createPost(formData: FormData) {
  const parsed = Schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "유효하지 않은 입력" };
  }
  await db.post.create({ data: parsed.data });
  revalidatePath("/posts");
}
```

## useActionState (사용자 친화적 폼 상태)

```tsx
"use client";
import { useActionState } from "react";

export function PostForm() {
  const [state, formAction, pending] = useActionState(createPost, { error: null });
  return (
    <form action={formAction}>
      <input name="title" />
      {state.error && <p>{state.error}</p>}
      <button disabled={pending}>저장</button>
    </form>
  );
}
```

## 보안 체크리스트

- [ ] 모든 입력은 Zod 등으로 검증
- [ ] 인증/권한 확인 (DAL 패턴 권장)
- [ ] CSRF — Next.js가 origin 체크로 일부 보호하나, 민감한 액션은 명시적 토큰 권장
- [ ] redirect 후 폼 데이터 노출 주의 (PRG 패턴)

## 다음

→ [03_middleware](../03_middleware/lesson.md)
