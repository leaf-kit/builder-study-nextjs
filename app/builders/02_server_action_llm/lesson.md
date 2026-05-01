# 02. Server Action 으로 LLM 호출 — 학습 가이드

## 사용 시점

- LLM 응답이 짧고 한 번에 반환됨 (요약, 분류, JSON 추출)
- 응답을 폼 결과로 자연스럽게 표시
- 별도 클라이언트 fetch 코드 없이 progressive enhancement

## 사용하지 말 것

- 응답이 길고 토큰 단위 표시가 필요한 챗봇 → Route Handler + ReadableStream
- 사용자가 도중에 취소해야 하는 경우 → fetch + AbortController

## useActionState 흐름

```ts
const [state, formAction, pending] = useActionState(ask, { answer: null, error: null });
```

- `state` — 액션이 반환한 마지막 값
- `formAction` — `<form action={...}>` 에 바인딩
- `pending` — 액션이 진행 중일 때 true

## 진짜 Claude API 로 교체

```ts
// actions.ts
"use server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function ask(prev, formData) {
  const prompt = String(formData.get("prompt"));
  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });
  const text = msg.content[0]?.type === "text" ? msg.content[0].text : "";
  return { answer: text, error: null };
}
```

## 다음

→ [03_structured_outputs](../03_structured_outputs/lesson.md)
