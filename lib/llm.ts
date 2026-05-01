import "server-only";

/**
 * 학습 저장소의 더미 LLM 호출 헬퍼.
 *
 * 실제 Claude API 를 쓰려면 ANTHROPIC_API_KEY 를 설정하고,
 * 본 파일을 @anthropic-ai/sdk 호출로 교체하세요. 본 저장소는 의존성을 최소화하기 위해
 * SDK 를 dependency 로 추가하지 않았습니다.
 *
 * 본 더미는 다음을 모방합니다:
 * - 짧은 비스트리밍 응답
 * - 청크 단위 스트리밍 응답
 *
 * 진짜 Claude API 호출 예시 (참고용 주석):
 *
 *   import Anthropic from "@anthropic-ai/sdk";
 *   const client = new Anthropic();
 *   const msg = await client.messages.create({
 *     model: "claude-sonnet-4-6",
 *     max_tokens: 1024,
 *     messages: [{ role: "user", content: prompt }],
 *   });
 *   return msg.content[0].type === "text" ? msg.content[0].text : "";
 */

export const HAS_API_KEY = Boolean(process.env.ANTHROPIC_API_KEY);

export async function generate(prompt: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 200));
  return `[더미 응답] 입력 길이: ${prompt.length}자. 학습용 가짜 결과입니다.${
    HAS_API_KEY ? " (API 키가 설정되어 있으나 학습용 더미를 사용 중)" : ""
  }`;
}

/**
 * 토큰 단위로 청크를 흘리는 스트림. ReadableStream<string> 반환.
 * 실제 Claude SDK 의 messages.stream() 형태를 모방합니다.
 */
export function generateStream(prompt: string): ReadableStream<string> {
  const chunks = [
    "안녕하세요,",
    " 입력 길이는 ",
    `${prompt.length}자 입니다.`,
    " 이 응답은 ",
    "학습용 더미 ",
    "스트림으로 ",
    "생성되었습니다.",
  ];
  let i = 0;
  return new ReadableStream<string>({
    async pull(controller) {
      if (i >= chunks.length) {
        controller.close();
        return;
      }
      await new Promise((r) => setTimeout(r, 200));
      controller.enqueue(chunks[i] ?? "");
      i++;
    },
  });
}
