# 08. Route Handlers — 학습 가이드

## 한 파일 = 한 라우트

```ts
// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) { ... }
export async function POST(req: NextRequest) { ... }
export async function PUT(req: NextRequest) { ... }
export async function DELETE(req: NextRequest) { ... }
```

## 동적 세그먼트가 있을 때

```ts
// app/api/posts/[id]/route.ts
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  return NextResponse.json({ id });
}
```

## NextResponse vs Response

- 기본 Web `Response` 도 OK. 단순한 케이스라면 `Response.json(...)` 가능.
- `NextResponse` 는 `redirect()`, `rewrite()`, 쿠키 헬퍼 등 추가 기능 제공.

## 캐싱

| 핸들러 | 기본 캐시 |
|---|---|
| GET (dynamic API 미사용) | 정적 캐시 가능 |
| GET (req.cookies, headers 사용) | 동적 |
| POST/PUT/DELETE | 항상 동적 |

## Route Handlers vs Server Actions

| | Route Handlers | Server Actions |
|---|---|---|
| 사용처 | 외부/3rd-party가 호출 | Next.js 앱 내부 폼/뮤테이션 |
| 경로 | `/api/...` 같은 URL | URL 없음 (RPC) |
| 호출 형태 | `fetch("/api/...")` | `<form action={fn}>` 또는 직접 호출 |

## 다음

→ 중급 끝. [03_advanced](../../advanced)로.
