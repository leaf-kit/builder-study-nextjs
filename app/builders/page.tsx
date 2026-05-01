import Link from "next/link";

const TOPICS = [
  { href: "/builders/01_streaming_llm", label: "01 스트리밍 LLM 응답 (Suspense)" },
  { href: "/builders/02_server_action_llm", label: "02 Server Action으로 LLM 호출" },
  { href: "/builders/03_structured_outputs", label: "03 Zod로 구조화 출력" },
  { href: "/builders/04_rag_skeleton", label: "04 RAG 골격" },
  { href: "/builders/05_tool_use", label: "05 Tool Use 패턴" },
];

export default function BuildersIndex() {
  return (
    <div>
      <h1 className="text-2xl font-bold">06. 프롬프트 빌더 트랙</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Claude API + Next.js 조합으로 LLM 앱을 짤 때 자주 쓰는 패턴들. 일부는{" "}
        <code>ANTHROPIC_API_KEY</code> 환경 변수가 있어야 실제로 호출됩니다 (없으면 더미 응답).
      </p>
      <ul className="mt-4 space-y-2">
        {TOPICS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded border border-[var(--border)] px-4 py-3 hover:border-[var(--accent)]"
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
