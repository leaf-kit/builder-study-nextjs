// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 02 Server Actions
// 난이도: 고급
// 학습 시간: ~30분
// 선행 학습: 02_intermediate/02_client_components, 03_advanced/01_caching_revalidation
//
// [무엇을 배우는가]
// - "use server" 함수가 클라이언트에서 호출 가능한 RPC가 되는 원리
// - <form action={fn}> 으로 progressive enhancement
// - .bind(null, arg) 패턴으로 액션에 추가 인자 전달
// - revalidatePath / revalidateTag 로 UI 자동 갱신
//
// [흔한 함정]
// - "use server" 는 파일 맨 위 또는 함수 본문 맨 위에. 일반 export 와 섞이면 안 됨
// - 액션 함수는 반드시 async
// - 액션 안에서 throw 하면 폼 위에 error.tsx 가 잡음 — 사용자 친화적 에러는 useActionState 활용
// - 입력 검증을 안 하면 클라이언트가 임의 데이터 보낼 수 있음 (Zod 사용 권장)
// ─────────────────────────────────────────

import { addTodo, deleteTodo, listTodos, toggleTodo } from "./actions";

export default async function Page() {
  const todos = await listTodos();
  return (
    <article>
      <h1 className="text-2xl font-bold">02. Server Actions</h1>
      <p className="mt-2 text-[var(--muted)]">
        폼 제출/뮤테이션이 별도 API 라우트 없이 함수 호출로 처리됩니다.
      </p>

      {/* form 의 action 에 서버 액션을 직접 바인딩.
          사용자가 제출하면 Next.js 가 RPC 형식으로 서버 함수를 호출.
          자바스크립트가 꺼져 있어도 동작 (HTML form submit 으로 fallback). */}
      <form action={addTodo} className="mt-4 flex gap-2">
        <input
          name="text"
          placeholder="새 할 일"
          className="flex-1 rounded border border-[var(--border)] px-3 py-1.5 text-sm"
        />
        <button type="submit" className="rounded border border-[var(--border)] px-3 py-1.5 text-sm">
          추가
        </button>
      </form>

      <ul className="mt-4 space-y-1">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-3 rounded border border-[var(--border)] px-3 py-2"
          >
            {/* .bind(null, t.id) 로 첫 인자를 미리 채움 (this 는 null).
                결과 함수의 시그니처는 (formData: FormData) => Promise<void> 로 form action 호환. */}
            <form action={toggleTodo.bind(null, t.id)}>
              <button
                type="submit"
                className={`text-sm ${t.done ? "line-through text-[var(--muted)]" : ""}`}
              >
                {t.done ? "✓" : "○"} {t.text}
              </button>
            </form>
            <form action={deleteTodo.bind(null, t.id)} className="ml-auto">
              <button type="submit" className="text-xs text-red-600">
                삭제
              </button>
            </form>
          </li>
        ))}
      </ul>
    </article>
  );
}
