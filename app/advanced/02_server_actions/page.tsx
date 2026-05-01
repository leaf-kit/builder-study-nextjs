import { addTodo, deleteTodo, listTodos, toggleTodo } from "./actions";

export default async function Page() {
  const todos = await listTodos();
  return (
    <article>
      <h1 className="text-2xl font-bold">02. Server Actions</h1>
      <p className="mt-2 text-[var(--muted)]">
        폼 제출/뮤테이션이 별도 API 라우트 없이 함수 호출로 처리됩니다.
      </p>

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
