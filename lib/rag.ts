import "server-only";

/**
 * 학습용 미니 RAG 골격.
 * 실무에서는 임베딩 모델(OpenAI, Voyage 등) + 벡터 DB(Pinecone, pgvector, Qdrant) 사용.
 * 여기서는 단순 텍스트 매칭으로 검색 흐름만 보여줍니다.
 */

const CORPUS = [
  {
    id: "rsc",
    title: "React Server Components",
    body: "RSC 는 서버에서 렌더링이 끝나고 자바스크립트가 클라이언트로 전송되지 않는 컴포넌트입니다.",
  },
  {
    id: "actions",
    title: "Server Actions",
    body: 'Server Actions 는 "use server" 로 선언된 함수로, 클라이언트가 호출할 수 있는 RPC 엔드포인트입니다.',
  },
  {
    id: "cache",
    title: "캐시 4겹",
    body: "Next.js 의 캐시는 Request Memoization, Data Cache, Full Route Cache, Router Cache 4겹입니다.",
  },
  {
    id: "edge",
    title: "Edge 런타임",
    body: "Edge 런타임은 V8 isolate 에서 실행되며, Node API 의 일부만 사용 가능합니다. middleware 는 항상 Edge.",
  },
];

export type Doc = (typeof CORPUS)[number];

/** 매우 단순한 키워드 점수 검색. 실무에서는 임베딩 코사인 유사도. */
export function search(query: string, k = 2): Doc[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = CORPUS.map((doc) => {
    const text = (doc.title + " " + doc.body).toLowerCase();
    const score = tokens.reduce((s, t) => s + (text.includes(t) ? 1 : 0), 0);
    return { doc, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .filter((s) => s.score > 0)
    .map((s) => s.doc);
}

/** 컨텍스트와 함께 답변 생성 (더미 LLM). */
export function buildPrompt(query: string, docs: Doc[]): string {
  const context = docs.map((d, i) => `[${i + 1}] ${d.title}\n${d.body}`).join("\n\n");
  return `다음 자료를 바탕으로 답하세요.\n\n${context}\n\n질문: ${query}`;
}
