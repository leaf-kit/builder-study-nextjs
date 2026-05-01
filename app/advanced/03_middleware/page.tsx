import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const greeting = (await headers()).get("x-study-greeting");
  return (
    <article>
      <h1 className="text-2xl font-bold">03. Middleware</h1>
      <p className="mt-2 text-[var(--muted)]">
        루트의 <code>middleware.ts</code> 가 모든 요청에 헤더를 주입합니다.
      </p>
      <pre className="mt-3 rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`X-Study-Greeting: ${greeting ?? "(없음)"}`}
      </pre>
      <p className="mt-3 text-sm">
        보호된 라우트로 진입 시도:{" "}
        <Link href="/advanced/03_middleware/protected" className="underline">
          /protected
        </Link>{" "}
        → 미들웨어가 자동으로 <code>?key=secret</code> 을 붙여 redirect.
      </p>
    </article>
  );
}
