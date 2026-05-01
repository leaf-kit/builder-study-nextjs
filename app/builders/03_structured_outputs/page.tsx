import { z } from "zod";

const ReceiptSchema = z.object({
  merchant: z.string(),
  total: z.number().nonnegative(),
  currency: z.enum(["KRW", "USD", "EUR", "JPY"]),
  items: z.array(z.object({ name: z.string(), price: z.number() })).min(1),
});

type Receipt = z.infer<typeof ReceiptSchema>;

// LLM 이 반환했다고 가정하는 JSON.
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
    const obj = JSON.parse(LLM_RAW_OUTPUT);
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
