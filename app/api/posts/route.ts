import { NextRequest, NextResponse } from "next/server";

// 인메모리 데이터 스토어. 프로세스 재시작 시 초기화됨 — 학습용 단순 예시.
let posts: { id: number; title: string }[] = [
  { id: 1, title: "첫 게시글" },
  { id: 2, title: "두 번째 게시글" },
];
let nextId = 3;

export async function GET(req: NextRequest) {
  // 쿼리 파싱은 NextRequest.nextUrl.searchParams.
  const q = req.nextUrl.searchParams.get("q");
  const filtered = q ? posts.filter((p) => p.title.includes(q)) : posts;
  return NextResponse.json({ items: filtered });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.title !== "string") {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }
  const created = { id: nextId++, title: body.title };
  posts = [...posts, created];
  return NextResponse.json(created, { status: 201 });
}
