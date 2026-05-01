// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 04 로딩과 스트리밍
// 난이도: 중급
// 학습 시간: ~25분
// 선행 학습: 03_data_fetching
//
// [무엇을 배우는가]
// - loading.tsx (페이지 전체 fallback)
// - <Suspense fallback={...}> (부분 fallback)
// - 스트리밍 SSR — 빠른 부분부터 사용자에게 도달
//
// [흔한 함정]
// - 모든 fetch 를 한 컴포넌트에 모으면 가장 느린 fetch가 페이지를 막음
// - <Suspense> 는 async 컴포넌트가 throw 하는 promise 를 잡아서 fallback 표시
// - loading.tsx 는 그 라우트 세그먼트의 page 트리 전체를 자동 Suspense 로 감쌈
// ─────────────────────────────────────────

import { Suspense } from "react";

// 가짜 느린 컴포넌트.
async function SlowSection({ label, ms }: { label: string; ms: number }) {
  // 의도적으로 지연. 실제로는 fetch / DB 호출이 자리잡음.
  await new Promise((r) => setTimeout(r, ms));
  return (
    <div className="rounded border border-[var(--border)] p-3">
      <strong>{label}</strong> — {ms}ms 후 도착
    </div>
  );
}

export default function Page() {
  return (
    <article className="space-y-4">
      <h1 className="text-2xl font-bold">04. 로딩과 스트리밍</h1>
      <p className="text-[var(--muted)]">
        Suspense 경계 별로 독립적으로 스트리밍됩니다. 각 박스는 도착 시점이 다릅니다.
      </p>

      {/* 각 Suspense 는 독립된 스트리밍 단위.
          A 가 먼저 끝나면 A 부터 사용자에게 보임. B,C 는 fallback 유지. */}
      <Suspense fallback={<div className="h-12 animate-pulse rounded bg-[rgba(127,127,127,0.2)]" />}>
        <SlowSection label="A" ms={500} />
      </Suspense>

      <Suspense fallback={<div className="h-12 animate-pulse rounded bg-[rgba(127,127,127,0.2)]" />}>
        <SlowSection label="B" ms={1500} />
      </Suspense>

      <Suspense fallback={<div className="h-12 animate-pulse rounded bg-[rgba(127,127,127,0.2)]" />}>
        <SlowSection label="C" ms={3000} />
      </Suspense>
    </article>
  );
}

// ─────────────────────────────────────────
// 직접 해보기
// 1) 위 세 Suspense 를 모두 제거하고 한 번에 셋을 렌더하면 어떻게 되나?
//    → 가장 느린 C(3초)가 끝날 때까지 어떤 박스도 안 보임.
//      대신 같은 폴더 loading.tsx 가 뜸 (페이지 전체 fallback).
// 2) loading.tsx 와 Suspense 가 함께 있을 때의 동작을 비교해 보세요.
// ─────────────────────────────────────────
