// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 04 링크와 네비게이션
// 난이도: 초급
// 학습 시간: ~15분
// 선행 학습: 02_pages_routes
//
// [실행 방법]
// - 브라우저: http://localhost:3000/beginner/04_link_navigation
//
// [무엇을 배우는가]
// - <Link> (선언형) vs useRouter (명령형) 의 사용처
// - prefetch 의 의미와 끄는 방법
// - router.refresh()가 RSC payload를 다시 가져오는 것 (full reload 아님)
//
// [흔한 함정]
// - 폼 제출 후 네비게이션은 useRouter 보다 Server Action + redirect 가 더 자연스러움 (고급 토픽)
// - useRouter 는 클라이언트 컴포넌트에서만 사용 가능 ("use client")
// ─────────────────────────────────────────

import Link from "next/link";
// 같은 폴더의 클라이언트 컴포넌트를 import.
// 서버 컴포넌트가 클라이언트 컴포넌트를 import 하는 것은 자연스러움.
// 반대(클라이언트→서버 default import)는 안 됨 (직렬화 불가).
import { ProgrammaticNav } from "./programmatic-nav";

export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">04. 링크와 네비게이션</h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">선언적 네비게이션 — &lt;Link&gt;</h2>
        {/* <Link>는 다음을 자동으로 한다:
            1) 뷰포트에 보이면 prefetch (RSC payload 미리 가져오기)
            2) 클릭 시 부분 네비게이션 (전체 새로고침 X)
            3) 스크롤 위치 복원 */}
        <ul className="mt-2 list-disc pl-6">
          <li>
            <Link href="/" className="text-[var(--accent)] underline">홈</Link>
          </li>
          <li>
            <Link href="/beginner" className="text-[var(--accent)] underline">초급 인덱스</Link>
          </li>
          <li>
            {/* prefetch={false}: 호버 또는 진입 직전까지 미리 가져오지 않음.
                내부 트래픽이 큰 사이트에서 비핵심 링크에 자주 사용. */}
            <Link
              href="/intermediate/06_dynamic_routes/hello"
              className="text-[var(--accent)] underline"
              prefetch={false}
            >
              prefetch={"{false}"} 로 비활성화한 링크
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">명령형 네비게이션 — useRouter</h2>
        {/* 클라이언트 컴포넌트로 분리한 이유: useRouter 는 훅이라 "use client"가 필요. */}
        <ProgrammaticNav />
      </section>
    </article>
  );
}

// ─────────────────────────────────────────
// 직접 해보기
// 1) DevTools Network 탭을 열고 "초급 인덱스" 링크에 마우스를 올려보세요.
//    → RSC payload(JSON-like) 요청이 prefetch 로 잡힙니다.
// 2) 위 prefetch={false} 링크에 호버해도 아무 요청이 가지 않는 것을 확인.
// ─────────────────────────────────────────
