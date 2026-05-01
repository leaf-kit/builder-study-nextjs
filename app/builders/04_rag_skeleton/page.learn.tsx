// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 04 RAG 골격
// 난이도: 빌더 트랙
// 학습 시간: ~30분
// 선행 학습: 03_structured_outputs
//
// [무엇을 배우는가]
// - Retrieve / Augment / Generate 3단계
// - 컨텍스트 인용을 프롬프트에 넣는 패턴
// - searchParams 로 폼 결과 표시 (URL 공유 가능)
//
// [흔한 함정]
// - 너무 많은 문서를 컨텍스트에 넣으면 토큰 비용 폭증 + 응답 품질 하락
// - 검색 품질이 낮으면 환각이 늘어남 → 인용 표시 + "모르면 모른다" 프롬프트
// - 임베딩과 인덱스는 빌드/배포 시점에 미리 만들어 두기 (요청 시점 X)
// ─────────────────────────────────────────

import Link from "next/link";
import { buildPrompt, search } from "@/lib/rag";
import { generate } from "@/lib/llm";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function Page({ searchParams }: Props) {
  const { q = "" } = await searchParams;

  // 1) Retrieve: 검색
  const docs = q ? search(q, 2) : [];
  // 2) Augment: 프롬프트에 컨텍스트 합치기
  const prompt = q ? buildPrompt(q, docs) : "";
  // 3) Generate: LLM 호출
  const answer = q ? await generate(prompt) : null;

  return (
    <article>
      <h1 className="text-2xl font-bold">04. RAG 골격</h1>
      <p className="mt-2 text-[var(--muted)]">
        검색(retrieve) → 컨텍스트 합치기(augment) → 답변 생성(generate) 의 최소 흐름.
      </p>

      {/* 폼 method 기본값은 GET → URL 의 ?q=... 로 들어감.
          서버 컴포넌트 페이지가 searchParams 를 읽어 같은 페이지를 다시 렌더. */}
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
