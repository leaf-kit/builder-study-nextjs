// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 01 스트리밍 LLM 응답 (RSC streaming)
// 난이도: 빌더 트랙
// 학습 시간: ~25분
// 선행 학습: 02_intermediate/04_loading_streaming
//
// [무엇을 배우는가]
// - 서버에서 LLM ReadableStream 소비
// - <Suspense> 안에서 async 컴포넌트가 스트리밍에 합류하는 동작
// - 진짜 Claude API 의 messages.stream() 도 같은 패턴
//
// [흔한 함정]
// - 한 컴포넌트 안에서 await 하면 모두 받을 때까지 막힘
//   → 토큰 단위로 화면에 흘리고 싶으면 별도 클라이언트 컴포넌트로 fetch 스트림 처리 (다음 토픽 02 에서 검토)
// ─────────────────────────────────────────

import { Suspense } from "react";
import { generateStream } from "@/lib/llm";

// async 서버 컴포넌트가 스트림을 끝까지 소비.
// Suspense 가 이 컴포넌트의 promise 를 잡아 fallback 표시.
async function StreamedAnswer({ prompt }: { prompt: string }) {
  const stream = generateStream(prompt);
  const reader = stream.getReader();
  const out: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) out.push(value);
  }
  return <p className="leading-relaxed">{out.join("")}</p>;
}

export default function Page() {
  const prompt = "Next.js 의 RSC 가 무엇인지 한 문단으로 설명해줘.";
  return (
    <article>
      <h1 className="text-2xl font-bold">01. 스트리밍 LLM 응답</h1>
      <p className="mt-2 text-[var(--muted)]">
        서버에서 LLM 스트림을 소비하고 RSC streaming 으로 화면에 흘립니다. 실제 Claude API 라면
        토큰 단위로 보일 정도로 빠르게 도착합니다.
      </p>

      <h2 className="mt-6 text-lg font-semibold">프롬프트</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">{prompt}</pre>

      <h2 className="mt-6 text-lg font-semibold">응답</h2>
      <Suspense fallback={<p className="animate-pulse text-[var(--muted)]">응답 생성 중...</p>}>
        <StreamedAnswer prompt={prompt} />
      </Suspense>
    </article>
  );
}
