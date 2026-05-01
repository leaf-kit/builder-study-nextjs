# 08. TS Props / params / searchParams — 학습 가이드

## Page 의 props 타입 (Next.js 15+)

```ts
type Props = {
  params: Promise<{ slug: string }>;        // [slug] 가 있을 때
  searchParams: Promise<{                    // ?q=...&sort=...
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { q } = await searchParams;
  // ...
}
```

## Layout 의 props 타입

```ts
type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;  // 동적 세그먼트가 부모에 있을 때
};
```

## API Route 의 props 타입

```ts
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  return Response.json({ id });
}
```

## 왜 Promise 인가?

- Next.js 15+에서 모든 dynamic API가 비동기로 통일됨 (cookies, headers 도 Promise)
- 이유: 부분 prerender(PPR) 와 streaming 모델에서 일관된 처리

## 다음

→ 초급 끝. [02_intermediate](../../intermediate)로 진행.
