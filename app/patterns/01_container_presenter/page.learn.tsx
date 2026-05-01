// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 01 Container / Presenter (RSC 시대 변형)
// 난이도: 패턴
// 학습 시간: ~15분
//
// [무엇을 배우는가]
// - 데이터 페칭(서버) 과 인터랙션(클라이언트) 의 분리
// - 클라이언트 컴포넌트로 내려가는 props 의 최소화
//
// [왜 알아야 하는가]
// - 클라이언트 번들 크기를 작게 유지
// - 비즈니스 결정은 서버에서 (보안, 성능)
// - 테스트 용이 (Presenter 는 순수 props 함수)
//
// [흔한 함정]
// - 데이터를 통째로 넘기지 말고 화면이 정말로 필요한 필드만 보내기 (over-fetching 방지)
// - Presenter 안에서 useEffect 로 다시 fetch 하면 패턴 의미 없음
// ─────────────────────────────────────────

import { ProductPresenter } from "./product-presenter";

type Product = { id: number; name: string; price: number };

async function getProduct(): Promise<Product> {
  await new Promise((r) => setTimeout(r, 50));
  return { id: 1, name: "기계식 키보드", price: 169000 };
}

// Container 의 책임:
// 1) 데이터 가져오기
// 2) 권한 / 비즈니스 결정
// 3) 직렬화 가능한 형태로 정리해서 Presenter 에 전달
export default async function Page() {
  const product = await getProduct();
  return (
    <article>
      <h1 className="text-2xl font-bold">01. Container / Presenter</h1>
      <p className="mt-2 text-[var(--muted)]">
        Container(서버)는 데이터를 가져오고, Presenter(클라이언트)는 그 데이터를 받아 인터랙션만 처리.
      </p>
      <div className="mt-4">
        <ProductPresenter product={product} />
      </div>
    </article>
  );
}
