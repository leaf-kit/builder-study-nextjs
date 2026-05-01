// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 03 Zod 로 LLM 의 구조화 출력 검증
// 난이도: 빌더 트랙
// 학습 시간: ~25분
//
// [무엇을 배우는가]
// - LLM 의 JSON 응답을 신뢰하지 않는 자세
// - Zod 스키마 → 컴파일 타입 + 런타임 검증을 한 번에
// - schema.parse vs schema.safeParse 의 차이
//
// [흔한 함정]
// - LLM 이 코드 펜스(```json ... ```) 로 감싸 보낼 수도 있음 → 전처리 필요
// - max_tokens 가 부족하면 JSON 이 잘려서 옴 → 파싱 실패
// - 구조화 출력은 tool use 또는 JSON mode 가 더 안정적 (다음 토픽 05)
// ─────────────────────────────────────────

import { z } from "zod";

// 스키마 한 번 정의로 두 가지를 얻음:
// 1) 런타임 검증 (parse / safeParse)
// 2) 컴파일 타입 (z.infer<typeof Schema>)
const ReceiptSchema = z.object({
  merchant: z.string(),
  total: z.number().nonnegative(),
  currency: z.enum(["KRW", "USD", "EUR", "JPY"]),
  items: z.array(z.object({ name: z.string(), price: z.number() })).min(1),
});

type Receipt = z.infer<typeof ReceiptSchema>;

// LLM 응답을 모방. 실제로는 generate(prompt) 의 텍스트 결과.
const LLM_RAW_OUTPUT = `{
  "merchant": "콩다방",
  "total": 13500,
  "currency": "KRW",
  "items": [
    { "name": "아메리카노", "price": 4500 },
    { "name": "카페라떼", "price": 5000 },
    { "name": "치즈케이크", "price": 4000 }
  ]
}`;

export default function Page() {
  let parsed: Receipt | null = null;
  let error: string | null = null;

  try {
    // 1) JSON.parse 로 자바스크립트 객체로 바꾼 후
    const obj = JSON.parse(LLM_RAW_OUTPUT);
    // 2) Zod 로 형식 검증. 실패하면 throw — 위 catch 가 잡음.
    //    실패해도 진행하고 싶으면 schema.safeParse() 로 { success, data | error } 받기.
    parsed = ReceiptSchema.parse(obj);
  } catch (e) {
    error = (e as Error).message;
  }

  return (
    <article>
      <h1 className="text-2xl font-bold">03. Zod 로 구조화 출력 검증</h1>
      <p className="mt-2 text-[var(--muted)]">
        LLM 의 JSON 응답은 항상 의심하세요. Zod 로 파싱하면서 검증해야 안전.
      </p>

      <h2 className="mt-6 text-lg font-semibold">LLM 원본 응답 (가정)</h2>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">{LLM_RAW_OUTPUT}</pre>

      <h2 className="mt-6 text-lg font-semibold">검증 결과</h2>
      {error && (
        <pre className="rounded border border-red-500/30 bg-red-50 p-3 text-xs text-red-700 dark:bg-red-950/20">
          {error}
        </pre>
      )}
      {parsed && (
        <div className="rounded border border-[var(--border)] p-3 text-sm">
          <p>
            <strong>{parsed.merchant}</strong> ({parsed.currency})
          </p>
          <p>합계: {parsed.total.toLocaleString()}</p>
          <ul className="mt-1 list-disc pl-6">
            {parsed.items.map((it, i) => (
              <li key={i}>
                {it.name} — {it.price.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
