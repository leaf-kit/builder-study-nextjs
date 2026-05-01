# 03. Middleware — 학습 가이드

## 위치와 시그니처

```ts
// 프로젝트 루트의 middleware.ts (단 한 파일만 존재 가능)
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // ...
  return NextResponse.next(); // 또는 redirect, rewrite, json
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

## 할 수 있는 동작

```ts
NextResponse.next();                     // 통과 (헤더 추가는 가능)
NextResponse.redirect(new URL("/login", req.url));
NextResponse.rewrite(new URL("/v2-page", req.url));  // URL 그대로, 다른 페이지 렌더
NextResponse.json({ error: "..." }, { status: 401 });
```

## 인증 패턴 (요지)

```ts
export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
```

## 미들웨어 vs 다른 위치의 인증

| 위치 | 장점 | 단점 |
|---|---|---|
| middleware.ts | 페이지 도달 전 차단, Edge에서 빠름 | DB 접근 어려움 (Edge 제약), 토큰 디코드만 가능 |
| layout.tsx | DB 호출 가능, 로직 풍부 | 페이지 모듈이 일부 로드된 후 차단 |
| Server Action | 액션 안에서 권한 체크 | 페이지는 보임 |

권장: **미들웨어로 대문 + DAL 안에서 세부 권한**.

## 다음

→ [04_intercepting_routes](../04_intercepting_routes/lesson.md)
