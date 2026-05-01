import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded border border-dashed border-[var(--border)] p-4">
      <p className="text-xs text-[var(--muted)]">
        이 박스는 <code>app/beginner/03_layouts/layout.tsx</code> 에서 그려집니다. 자식 라우트가
        바뀌어도 이 박스는 리마운트되지 않습니다.
      </p>
      <nav className="mt-2 flex gap-3 text-sm">
        <Link href="/beginner/03_layouts" className="underline">/</Link>
        <Link href="/beginner/03_layouts/about" className="underline">/about</Link>
      </nav>
      <div className="mt-4">{children}</div>
    </div>
  );
}
