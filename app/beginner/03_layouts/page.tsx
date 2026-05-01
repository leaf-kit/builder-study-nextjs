export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">03. 레이아웃</h1>
      <p className="mt-2 text-[var(--muted)]">
        위의 점선 박스는 <code>layout.tsx</code> 가 그린 것입니다. 위 링크를 눌러
        <code> /about</code> 으로 이동해 봐도 점선 박스는 그대로 유지됩니다 (네비게이션이
        부분적이라 layout은 리마운트되지 않음).
      </p>
    </article>
  );
}
