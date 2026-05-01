export default function Page() {
  const items = ["사과", "배", "감"];
  return (
    <article>
      <h1 className="text-2xl font-bold">02. 페이지와 라우트</h1>
      <p className="mt-2 text-[var(--muted)]">
        이 페이지는 <code>app/beginner/02_pages_routes/page.tsx</code> 에서 옵니다.
      </p>
      <h2 className="mt-6 text-lg font-semibold">서버에서 렌더된 리스트</h2>
      <ul className="mt-2 list-disc pl-6">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-[var(--muted)]">
        브라우저 DevTools → Network → Doc 응답을 보면 위 <code>li</code> 들이 이미 HTML로 들어와
        있습니다. 자바스크립트가 꺼져 있어도 보입니다.
      </p>
    </article>
  );
}
