import "server-only";
// ↑ 이 import 는 클라이언트 컴포넌트가 실수로 이 파일을 import 하면 빌드 에러를 냄.
//   비밀 키 / DB 접근 / 권한 로직이 클라이언트 번들로 새는 것을 방지.

type Note = { id: number; ownerId: string; title: string; body: string; visibility: "public" | "private" };

const NOTES: Note[] = [
  { id: 1, ownerId: "alice", title: "공개 메모", body: "이것은 공개", visibility: "public" },
  { id: 2, ownerId: "alice", title: "비밀 메모", body: "이것은 비밀", visibility: "private" },
  { id: 3, ownerId: "bob",   title: "Bob의 공개", body: "Bob 의 글", visibility: "public" },
];

/**
 * 사용자가 볼 수 있는 메모 목록.
 * - 본인 메모는 모두 보임
 * - 타인 메모는 public 만
 * 권한 검증과 데이터 정제(필요 필드만 노출)를 한 곳에 모음.
 */
export async function listVisibleNotes(viewerId: string) {
  return NOTES
    .filter((n) => n.ownerId === viewerId || n.visibility === "public")
    .map((n) => ({
      id: n.id,
      title: n.title,
      excerpt: n.body.slice(0, 30),
      // body 전체는 노출 안 함 — 페이지가 정말 필요할 때 별도 함수 호출
    }));
}
