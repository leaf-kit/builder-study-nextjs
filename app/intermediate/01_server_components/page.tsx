import { headers } from "next/headers";

export default async function Page() {
  const ts = new Date().toISOString();
  const ua = (await headers()).get("user-agent") ?? "(unknown)";
  return (
    <article>
      <h1 className="text-2xl font-bold">01. Server Components</h1>
      <p className="mt-2 text-[var(--muted)]">
        이 컴포넌트는 서버에서만 실행됩니다. 아래 두 값은 매 요청마다 서버에서 생성된 결과입니다.
      </p>
      <pre className="mt-3 rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`Rendered at: ${ts}
User-Agent:   ${ua}`}
      </pre>
      <p className="mt-3 text-sm">
        브라우저에 가는 자바스크립트에는 위 값들이 <strong>이미 박혀</strong> 있습니다.
        새로고침하면 새 값으로 다시 만들어집니다.
      </p>
    </article>
  );
}
