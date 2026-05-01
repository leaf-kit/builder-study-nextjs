import Link from "next/link";
import { ProgrammaticNav } from "./programmatic-nav";

export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">04. 링크와 네비게이션</h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">선언적 네비게이션 — &lt;Link&gt;</h2>
        <ul className="mt-2 list-disc pl-6">
          <li>
            <Link href="/" className="text-[var(--accent)] underline">홈</Link>
          </li>
          <li>
            <Link href="/beginner" className="text-[var(--accent)] underline">초급 인덱스</Link>
          </li>
          <li>
            <Link
              href="/intermediate/06_dynamic_routes/hello"
              className="text-[var(--accent)] underline"
              prefetch={false}
            >
              prefetch={"{false}"} 로 비활성화한 링크
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">명령형 네비게이션 — useRouter</h2>
        <ProgrammaticNav />
      </section>
    </article>
  );
}
