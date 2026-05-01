import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // 빌드 타임에 미리 생성할 slug 들. 이 외 slug 는 요청 시 동적 생성(default).
  return [{ slug: "hello" }, { slug: "world" }];
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  return (
    <article>
      <h1 className="text-2xl font-bold">동적 라우트 — /{slug}</h1>
      <p className="mt-2 text-[var(--muted)]">
        URL의 마지막 세그먼트가 <code>params.slug</code> 로 들어옵니다.
      </p>
      <p className="mt-4 text-sm">다른 slug 시도:</p>
      <ul className="mt-2 list-disc pl-6">
        <li><Link href="/intermediate/06_dynamic_routes/hello" className="underline">/hello</Link></li>
        <li><Link href="/intermediate/06_dynamic_routes/world" className="underline">/world</Link></li>
        <li><Link href="/intermediate/06_dynamic_routes/foo" className="underline">/foo (동적 생성)</Link></li>
      </ul>
    </article>
  );
}
