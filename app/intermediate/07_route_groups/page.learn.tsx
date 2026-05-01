// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 07 Route Groups + Parallel Routes
// 난이도: 중급
// 학습 시간: ~20분
//
// [무엇을 배우는가]
// - (group) 폴더로 URL 안 바꾸고 코드 정리 / 다른 layout 적용
// - @slot 으로 layout이 children 외 추가 페이지를 받음
//
// [어디에 쓰는가]
// - 마케팅 페이지와 앱 페이지가 같은 도메인에 있을 때 layout 분리
// - 대시보드의 동시 슬롯 (analytics, notifications) — 한 페이지에 여러 영역
// - 모달 라우트 — Intercepting Routes 와 결합 (03_advanced/04_intercepting_routes)
// ─────────────────────────────────────────

export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">07. 라우트 그룹과 Parallel Routes</h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">A) Route Groups — <code>(name)</code></h2>
        <ul className="mt-2 list-disc pl-6 text-sm">
          <li><strong>형태</strong>: 폴더명을 <code>(...)</code> 로 감싼다.</li>
          <li><strong>효과</strong>: URL에 포함되지 않는다. 코드 정리 / 다른 layout 적용 용도.</li>
          <li>
            예: <code>app/(marketing)/page.tsx</code> → URL은 <code>/</code> 그대로,
            하지만 그 트리만의 layout 적용 가능.
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">B) Parallel Routes — <code>@slot</code></h2>
        <p className="mt-2 text-sm">
          한 layout이 동시에 여러 페이지를 children 외에도 받을 수 있게 함. 대시보드/분석/알림 슬롯
          같은 동시 표시에 사용. 본 토픽은 개념 설명만 — 실제 데모는 README의 시연 섹션 참고.
        </p>
        <pre className="mt-2 rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
{`app/dashboard/
├── layout.tsx          // params: { children, analytics, notifications }
├── page.tsx
├── @analytics/
│   └── page.tsx
└── @notifications/
    └── page.tsx`}
        </pre>
        {/* layout.tsx 의 시그니처:
            export default function L({ children, analytics, notifications }) {...}
            → @analytics 가 자동으로 analytics prop 으로 들어옴. */}
      </section>
    </article>
  );
}
