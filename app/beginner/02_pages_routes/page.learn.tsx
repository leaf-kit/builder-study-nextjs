// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 02 페이지와 라우트
// 난이도: 초급
// 학습 시간: ~10분
// 선행 학습: 01_project_setup
//
// [실행 방법]
// - 브라우저: http://localhost:3000/beginner/02_pages_routes
// - raw 버전: ./page.tsx
//
// [무엇을 배우는가]
// - app/<폴더>/page.tsx 가 곧 라우트라는 사실
// - 서버 컴포넌트가 기본이라는 사실
// - 결과 HTML을 브라우저가 받기까지의 흐름
//
// [왜 알아야 하는가]
// 첫 페이지를 만드는 가장 작은 단위. 여기서 헷갈리면 다음 토픽이 다 어렵다.
//
// [어디에 쓰는가]
// - 정적 콘텐츠 페이지(소개, 약관)
// - 단순한 데이터 노출 페이지
//
// [흔한 함정]
// - 폴더만 만들고 page.tsx를 안 두면 라우트가 안 됨
// - default export 가 아니면 인식 안 됨
//
// [예상 출력]
// "02. 페이지와 라우트" + 서버에서 렌더된 리스트(사과/배/감)
// ─────────────────────────────────────────

// 이 컴포넌트는 export default 함수 한 개. Next.js가 page.tsx의 default export를 라우트의 페이지로 사용.
// 이름은 무엇이든 좋지만 관례상 `Page`.
export default function Page() {
  // 이 배열의 생성은 "서버"에서 일어남. 빌드 타임 또는 요청 타임에.
  // 클라이언트(브라우저)는 결과 HTML만 받음 — items 변수는 번들에 들어가지 않음.
  const items = ["사과", "배", "감"];

  return (
    <article>
      <h1 className="text-2xl font-bold">02. 페이지와 라우트</h1>
      <p className="mt-2 text-[var(--muted)]">
        이 페이지는 <code>app/beginner/02_pages_routes/page.tsx</code> 에서 옵니다.
      </p>
      <h2 className="mt-6 text-lg font-semibold">서버에서 렌더된 리스트</h2>
      {/* 리스트 렌더는 서버에서 끝남. 브라우저는 완성된 <li>들을 받음. */}
      <ul className="mt-2 list-disc pl-6">
        {items.map((it) => (
          // key는 React가 동일성 추적용으로 요구. 인덱스보다 안정적인 식별자가 권장.
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

// ─────────────────────────────────────────
// 직접 해보기
// 1) console.log("hello from server")를 컴포넌트 본문에 추가하고 페이지를 새로고침하세요.
//    → 브라우저 콘솔이 아니라 `pnpm dev`를 실행한 터미널에 찍힙니다.
//      이것이 "서버에서 실행된다"의 증거입니다.
// 2) 이 컴포넌트 맨 위에 "use client" 한 줄을 추가하고 다시 새로고침하세요.
//    → 이제 console.log는 브라우저 콘솔에 찍힙니다 (클라이언트 컴포넌트가 됐으니까).
//      확인 후 다시 지우세요.
// ─────────────────────────────────────────
