import Link from "next/link";
import { buildPrompt, search } from "@/lib/rag";
import { generate } from "@/lib/llm";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function Page({ searchParams }: Props) {
  const { q = "" } = await searchParams;

  const docs = q ? search(q, 2) : [];
  const prompt = q ? buildPrompt(q, docs) : "";
  const answer = q ? await generate(prompt) : null;

  return (
    <article>
      <h1 className="text-2xl font-bold">04. RAG 골격</h1>
      <p className="mt-2 text-[var(--muted)]">
        검색(retrieve) → 컨텍스트 합치기(augment) → 답변 생성(generate) 의 최소 흐름.
      </p>

      <form className="mt-4 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="예: 'RSC 가 뭐예요?'"
          className="flex-1 rounded border border-[var(--border)] px-3 py-1.5 text-sm"
        />
        <button type="submit" className="rounded border border-[var(--border)] px-3 py-1.5 text-sm">
          검색+생성
        </button>
      </form>

      {q && (
        <>
          <h2 className="mt-6 text-lg font-semibold">검색된 문서</h2>
          {docs.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">매칭된 문서가 없습니다.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {docs.map((d) => (
                <li
                  key={d.id}
                  className="rounded border border-[var(--border)] px-3 py-2 text-sm"
                >
                  <strong>{d.title}</strong>
                  <p className="text-[var(--muted)]">{d.body}</p>
                </li>
              ))}
            </ul>
          )}

          <h2 className="mt-6 text-lg font-semibold">조립된 프롬프트</h2>
          <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">{prompt}</pre>

          <h2 className="mt-6 text-lg font-semibold">생성된 답변</h2>
          <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">{answer}</pre>
        </>
      )}

      <p className="mt-6 text-xs text-[var(--muted)]">
        다른 질문 시도:{" "}
        <Link href="?q=RSC" className="underline">RSC</Link>{" · "}
        <Link href="?q=캐시" className="underline">캐시</Link>{" · "}
        <Link href="?q=Edge" className="underline">Edge</Link>
      </p>
    </article>
  );
}
