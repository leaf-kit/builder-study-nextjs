import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next.js Study",
    template: "%s · Next.js Study",
  },
  description: "Next.js + TypeScript 학습 저장소 — 실무 투입 가능 수준까지",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <header className="border-b border-[var(--border)]">
          <nav className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4 text-sm">
            <Link href="/" className="font-semibold">
              📚 Next.js Study
            </Link>
            <span className="text-[var(--muted)]">/</span>
            <Link href="/beginner" className="hover:underline">초급</Link>
            <Link href="/intermediate" className="hover:underline">중급</Link>
            <Link href="/advanced" className="hover:underline">고급</Link>
            <Link href="/patterns" className="hover:underline">패턴</Link>
            <Link href="/idioms" className="hover:underline">관용구</Link>
            <Link href="/builders" className="hover:underline">빌더</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-6 py-12 text-xs text-[var(--muted)]">
          학습 저장소 · 모든 코드 주석은 한국어 · {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
