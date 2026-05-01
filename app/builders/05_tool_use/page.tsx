export default function Page() {
  return (
    <article className="space-y-6">
      <h1 className="text-2xl font-bold">05. Tool Use 패턴</h1>
      <p className="text-[var(--muted)]">
        LLM 이 외부 함수(도구)를 호출하도록 시키는 패턴. Anthropic Claude 의 <code>tools</code>{" "}
        파라미터로 도구를 등록하고, 모델이 입력값을 생성해 호출 의사를 표시하면 우리가 실행 후 결과를 다시
        넣어주는 흐름입니다.
      </p>

      <section>
        <h2 className="text-lg font-semibold">전체 흐름</h2>
        <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`1) tools = [{ name, description, input_schema }] 정의
2) messages.create({ tools, messages }) 호출
3) 응답에 tool_use 블록이 있으면 → 해당 함수 실행
4) 결과를 tool_result 블록으로 다음 messages.create 에 첨부
5) 모델이 최종 텍스트 답변 생성
`}
        </pre>
      </section>

      <section>
        <h2 className="text-lg font-semibold">도구 정의 예시</h2>
        <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`const tools = [
  {
    name: "get_weather",
    description: "주어진 도시의 현재 날씨를 가져온다.",
    input_schema: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
    },
  },
];`}
        </pre>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Next.js 와의 결합</h2>
        <ul className="list-disc pl-6 text-sm">
          <li>도구 함수는 서버 모듈(<code>lib/tools.ts</code>)에 두고 <code>server-only</code> 마커.</li>
          <li>Server Action 또는 Route Handler 가 멀티턴 루프를 돌리면서 model ↔ tool 왕복.</li>
          <li>도구 결과는 클라이언트에 보여줄 필요 없으면 노출하지 말기 (DB 키, 내부 ID 등).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">멀티턴 루프 (의사 코드)</h2>
        <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`async function runAgent(userPrompt: string) {
  let messages = [{ role: "user", content: userPrompt }];

  while (true) {
    const res = await client.messages.create({
      model: "claude-sonnet-4-6",
      tools,
      messages,
      max_tokens: 1024,
    });

    if (res.stop_reason !== "tool_use") {
      return extractText(res);
    }

    const toolUses = res.content.filter((b) => b.type === "tool_use");
    const toolResults = await Promise.all(
      toolUses.map(async (tu) => ({
        type: "tool_result",
        tool_use_id: tu.id,
        content: await runTool(tu.name, tu.input),
      })),
    );

    messages = [
      ...messages,
      { role: "assistant", content: res.content },
      { role: "user", content: toolResults },
    ];
  }
}`}
        </pre>
      </section>
    </article>
  );
}
