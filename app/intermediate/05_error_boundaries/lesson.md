# 05. 에러 바운더리 — 학습 가이드

## 파일별 역할

| 파일 | 잡는 에러 | 비고 |
|---|---|---|
| `error.tsx` | 같은 세그먼트의 page/layout 에러 | "use client" 필수 |
| `global-error.tsx` | root layout 에러 | app/ 루트에 둠. body/html 직접 렌더 |
| `not-found.tsx` | `notFound()` 호출 / 매칭 안 되는 라우트 | 서버 컴포넌트 OK |

## 권장 패턴

```tsx
// app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound(); // never returns — TS 가 narrowing 해줌
  return <Article post={post} />;
}
```

## 프로덕션 vs 개발 차이

- **개발**: 에러 stack/메시지 그대로 노출
- **프로덕션**: `error.message` 가 "An error occurred..." 로 마스킹. `error.digest` 로 서버 로그와 매칭

## 다음

→ [06_dynamic_routes](../06_dynamic_routes/lesson.md)
