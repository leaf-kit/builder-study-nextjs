// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 02 Data Access Layer (DAL)
// 난이도: 패턴
// 학습 시간: ~20분
// 선행 학습: 03_advanced/02_server_actions
//
// [무엇을 배우는가]
// - 모든 DB/외부 데이터 접근을 한 모듈로 모으는 이유
// - server-only 패키지로 클라이언트 누출 방지
// - 권한 검증을 페이지마다 반복하지 않는 방법
//
// [왜 알아야 하는가]
// 권한 로직을 페이지/액션마다 짜면 한 군데를 빼먹는 순간 데이터 유출.
// DAL 한 곳을 통과해야 데이터가 나오게 하면 사고 가능성을 크게 낮춤.
//
// [흔한 함정]
// - DAL 이 너무 두꺼워지는 것 (도메인 별 분리: notes-dal, users-dal, ...)
// - 캐시 키를 사용자 ID 와 안 묶으면 다른 사용자에게 캐시된 결과가 노출
// ─────────────────────────────────────────

// 절대 경로 import 는 tsconfig 의 paths 설정으로 동작 (@/lib/...).
import { listVisibleNotes } from "@/lib/notes-dal";

export default async function Page() {
  // 실무에서는 viewerId 는 cookies/JWT 디코드로 얻은 현재 사용자 ID.
  const notes = await listVisibleNotes("alice");
  return (
    <article>
      <h1 className="text-2xl font-bold">02. Data Access Layer (DAL)</h1>
      <p className="mt-2 text-[var(--muted)]">
        모든 데이터 접근은 <code>lib/notes-dal.ts</code> 의 함수를 통해서만 합니다. 권한 검증, 캐시
        키, 데이터 정제가 한곳에 모여 있습니다.
      </p>
      <ul className="mt-4 space-y-1">
        {notes.map((n) => (
          <li
            key={n.id}
            className="rounded border border-[var(--border)] px-3 py-2 text-sm"
          >
            <strong>{n.title}</strong>{" "}
            <span className="text-[var(--muted)]">— {n.excerpt}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
