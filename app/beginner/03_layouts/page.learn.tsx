// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 03 레이아웃
// 난이도: 초급
// 학습 시간: ~15분
// 선행 학습: 02_pages_routes
//
// [실행 방법]
// - 브라우저: http://localhost:3000/beginner/03_layouts
// - 같은 폴더 layout.tsx + about/page.tsx 도 함께 봐야 의미가 보임
//
// [무엇을 배우는가]
// - layout.tsx의 역할 (자식 라우트를 감싸는 컴포넌트)
// - 자식 라우트 변경 시 layout이 리마운트되지 않는 동작
// - 중첩 layout (route segment마다 layout을 둘 수 있다)
//
// [왜 알아야 하는가]
// - 사이드바, 헤더, 풋터 같은 공통 UI를 한 곳에 둠
// - 중첩 레이아웃으로 섹션별 다른 헤더 가능
// - 클라이언트 컴포넌트라면 layout이 유지되므로 상태도 유지됨
//
// [어디에 쓰는가]
// - 대시보드의 사이드바 + 본문 분리
// - 인증 영역과 공개 영역의 다른 헤더
//
// [흔한 함정]
// - layout.tsx의 함수는 반드시 children prop을 받아야 함
// - layout 안에서 useState를 쓰려면 "use client"가 필요 (그러나 가능하면 layout은 서버 유지)
//
// [예상 출력]
// 점선 박스 안에 페이지 내용. /about 으로 이동해도 점선 박스 그대로.
// ─────────────────────────────────────────

export default function Page() {
  // 이 페이지는 layout.tsx가 children으로 받아 렌더링됨.
  // 따라서 페이지 본문은 layout이 그린 점선 박스 안에 들어감.
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

// ─────────────────────────────────────────
// 직접 해보기
// 1) layout.tsx 안에 useState로 카운터를 만들어 보세요 ("use client" 필요).
//    /about 으로 이동했다 돌아왔을 때 카운터 값이 유지되는지 확인.
// 2) about/ 안에 별도 layout.tsx를 만들면 어떻게 되는지 확인.
//    → 중첩 layout. 부모 layout이 자식 layout을 감쌈.
// ─────────────────────────────────────────
