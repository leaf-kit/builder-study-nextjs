# 03. Zod 로 구조화 출력 검증 — 학습 가이드

## 왜 검증인가

LLM 은 **자연어 모델** 이라 JSON 을 약속해도 가끔 어김:

- 키 누락 / 추가 키
- 숫자 대신 문자열 (`"price": "4500"`)
- 코드 펜스로 감쌈 (`` ```json ... ``` ``)
- 응답 잘림 (max_tokens 부족)

→ 무조건 검증.

## 패턴

```ts
import { z } from "zod";

const Schema = z.object({ ... });

function extractJSON(text: string): unknown {
  // 코드 펜스 제거 등 전처리
  const cleaned = text.trim().replace(/^```(?:json)?/, "").replace(/```$/, "");
  return JSON.parse(cleaned);
}

const result = Schema.safeParse(extractJSON(llmText));
if (!result.success) {
  // 재시도 또는 사용자 노출
}
```

## 더 안전한 방법: tool use / JSON mode

Anthropic Claude 는 tool use 로 스키마 강제 가능:

```ts
const tools = [{
  name: "save_receipt",
  description: "영수증 정보를 저장",
  input_schema: zodToJsonSchema(ReceiptSchema), // zod-to-json-schema 사용
}];

const msg = await client.messages.create({
  model: "claude-sonnet-4-6",
  tools,
  tool_choice: { type: "tool", name: "save_receipt" }, // 강제 호출
  messages: [...],
});

// msg.content 에서 tool_use 블록을 찾아 input 사용 (이미 스키마 부합)
```

## 다음

→ [04_rag_skeleton](../04_rag_skeleton/lesson.md)
