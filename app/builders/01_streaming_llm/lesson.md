# 01. 스트리밍 LLM 응답 — 학습 가이드

## 두 가지 스트리밍 방식

| 방식 | 설명 | 토큰 단위 흐름 |
|---|---|---|
| RSC streaming + Suspense | 서버에서 모두 받고 한 번에 렌더 | ❌ |
| Route Handler 가 ReadableStream 반환 + 클라가 fetch | 토큰 단위로 화면에 흐름 | ✅ |

본 토픽은 첫 번째. 토큰 단위 흐름이 필요하면 다음 패턴.

## 토큰 단위 (참고)

```ts
// app/api/chat/route.ts
export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const stream = generateStream(prompt);
  return new Response(
    stream.pipeThrough(new TextEncoderStream()),
    { headers: { "Content-Type": "text/event-stream" } },
  );
}

// 클라이언트
const r = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ prompt }) });
const reader = r.body!.pipeThrough(new TextDecoderStream()).getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  setText((t) => t + value);
}
```

## 진짜 Claude API 호출

```ts
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();

const stream = await client.messages.stream({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }],
});
for await (const event of stream) {
  if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
    yield event.delta.text;
  }
}
```

## 다음

→ [02_server_action_llm](../02_server_action_llm/lesson.md)
