import { ProductPresenter } from "./product-presenter";

type Product = { id: number; name: string; price: number };

async function getProduct(): Promise<Product> {
  await new Promise((r) => setTimeout(r, 50));
  return { id: 1, name: "기계식 키보드", price: 169000 };
}

// Container: 서버 컴포넌트. 데이터 페칭, 권한, 비즈니스 결정.
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
