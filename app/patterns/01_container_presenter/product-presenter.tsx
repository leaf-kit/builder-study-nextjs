"use client";

import { useState } from "react";

type Product = { id: number; name: string; price: number };

// Presenter: 클라이언트 컴포넌트. 받은 데이터를 표시하고 상호작용만 처리.
export function ProductPresenter({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const total = product.price * qty;
  return (
    <div className="rounded border border-[var(--border)] p-4">
      <p className="font-medium">{product.name}</p>
      <p className="text-sm text-[var(--muted)]">단가 {product.price.toLocaleString()}원</p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="rounded border border-[var(--border)] px-2"
        >
          −
        </button>
        <span className="font-mono">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className="rounded border border-[var(--border)] px-2"
        >
          +
        </button>
      </div>
      <p className="mt-2 font-semibold">합계 {total.toLocaleString()}원</p>
    </div>
  );
}
