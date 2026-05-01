"use server";

import { generate } from "@/lib/llm";

export type AskState = { answer: string | null; error: string | null };

export async function ask(prev: AskState, formData: FormData): Promise<AskState> {
  const prompt = String(formData.get("prompt") ?? "").trim();
  if (!prompt) {
    return { answer: null, error: "프롬프트를 입력하세요." };
  }
  if (prompt.length > 500) {
    return { answer: null, error: "500자 이내로 입력하세요." };
  }
  try {
    const answer = await generate(prompt);
    return { answer, error: null };
  } catch (e) {
    return { answer: null, error: (e as Error).message };
  }
}
