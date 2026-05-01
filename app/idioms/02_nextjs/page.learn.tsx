// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: Next.js 관용구
// 난이도: 관용구
//
// [무엇을 배우는가]
// - server-only / client-only 마커
// - env 변수 노출 규칙
// - "use server" 가 함수 단위로도 가능하다는 사실
// - dynamic API (cookies/headers) 사용 위치 전략
// ─────────────────────────────────────────

export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">02. Next.js 관용구</h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">A) server-only / client-only</h2>
        <p className="mt-1 text-sm">
          모듈 맨 위에 import 만 추가. 잘못된 환경에서 import 되면 빌드 에러.
        </p>
        <pre className="mt-2 rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`// lib/db.ts
import "server-only";
export const db = createDbClient(process.env.DATABASE_URL!);`}
        </pre>
        {/* 반대편: client-only 는 IntersectionObserver 같은 브라우저 전용 헬퍼 모듈에 사용 */}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">B) env 분리 — public vs secret</h2>
        <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`// 서버 어디서나 OK
process.env.DATABASE_URL

// 클라이언트로 전달돼야 함 → NEXT_PUBLIC_ 접두사 필수
process.env.NEXT_PUBLIC_APP_NAME`}
        </pre>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">C) "use server" 는 함수 단위로도 가능</h2>
        <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`// 페이지 안에 인라인 — 짧은 액션에 편리
export default function Page() {
  async function save(formData: FormData) {
    "use server";
    // ...
  }
  return <form action={save}>...</form>;
}`}
        </pre>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">D) cookies/headers 는 한 곳에서만</h2>
        <p className="mt-1 text-sm">
          cookies()/headers() 호출은 자동으로 동적 렌더 트리거. 가능하면 helper 한 곳에 모으고,
          페이지에서 직접 호출하지 않으면 캐시 가능 영역이 늘어난다.
        </p>
      </section>
    </article>
  );
}
