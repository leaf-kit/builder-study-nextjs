import { NextResponse, type NextRequest } from "next/server";

/**
 * 본 학습 저장소의 미들웨어 데모.
 *
 * 동작:
 * 1) 응답 헤더에 X-Study-Greeting 추가 (모든 요청)
 * 2) /advanced/03_middleware/protected 경로는 ?key=secret 쿼리가 없으면 ?key=secret 으로 redirect
 *    → 학습용 단순 게이트. 실제 인증은 쿠키/JWT 검증.
 *
 * Edge 런타임에서 실행됨 — Node API 일부 제약 있음.
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname === "/advanced/03_middleware/protected") {
    if (url.searchParams.get("key") !== "secret") {
      const redirected = url.clone();
      redirected.searchParams.set("key", "secret");
      return NextResponse.redirect(redirected);
    }
  }

  const res = NextResponse.next();
  res.headers.set("X-Study-Greeting", "Hello from middleware");
  return res;
}

// 어떤 경로에 미들웨어를 적용할지 — 정적 자산은 제외하는 패턴이 표준.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
