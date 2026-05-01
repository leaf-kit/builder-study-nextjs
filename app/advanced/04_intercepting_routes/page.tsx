export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">04. Intercepting Routes</h1>
      <p className="mt-2 text-[var(--muted)]">
        모달 라우팅의 핵심. <code>(.)folder</code>, <code>(..)folder</code>, <code>(...)folder</code>{" "}
        는 같은/상위/루트 레벨의 다른 라우트를 가로채서 현재 layout 안에 렌더합니다.
      </p>

      <h2 className="mt-6 text-lg font-semibold">왜 필요한가</h2>
      <ul className="mt-2 list-disc pl-6 text-sm">
        <li>인스타그램의 사진 카드를 클릭 → 모달로 상세가 뜨고 URL은 /photo/123 으로 변경</li>
        <li>새로고침하면 같은 URL이지만 모달이 아니라 본문 페이지로 표시</li>
        <li>공유 가능한 URL + 모달 UX 동시 만족</li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold">구조</h2>
      <pre className="mt-2 rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`app/
├── photo/
│   └── [id]/
│       └── page.tsx              ← 직접 진입 (전체 페이지)
├── @modal/
│   ├── default.tsx               ← 슬롯 기본 (없을 때)
│   └── (.)photo/
│       └── [id]/
│           └── page.tsx          ← 가로채기 (모달)
└── layout.tsx                    ← children + modal 슬롯`}
      </pre>

      <p className="mt-4 text-sm text-[var(--muted)]">
        본 저장소는 개념 설명만 — 모달 라우팅 데모는 분량상 생략.{" "}
        <a className="underline" href="https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes">
          공식 문서 가이드
        </a>{" "}
        를 따라 추가 실습하세요.
      </p>
    </article>
  );
}
