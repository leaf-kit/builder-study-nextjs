import { Counter } from "./counter";

export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">02. Client Components</h1>
      <p className="mt-2 text-[var(--muted)]">
        이 페이지(서버 컴포넌트) 안에서 클라이언트 컴포넌트(<code>Counter</code>)를 import해 사용합니다.
      </p>
      <div className="mt-4">
        <Counter initial={0} />
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">
        DevTools → Network → JS 항목에서 Counter 의 자바스크립트가 별도 번들로 내려오는지 확인.
      </p>
    </article>
  );
}
