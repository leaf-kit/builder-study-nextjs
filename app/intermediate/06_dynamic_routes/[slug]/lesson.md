# 06. 동적 라우트 — 학습 가이드

## 변형 표

| 폴더 | 매칭 | params |
|---|---|---|
| `[slug]` | `/posts/abc` | `{ slug: "abc" }` |
| `[...slug]` | `/posts/a/b/c` | `{ slug: ["a","b","c"] }` |
| `[[...slug]]` | `/posts` 또는 `/posts/a/b` | `{ slug: undefined }` 또는 `{ slug: [...] }` |

## generateStaticParams

빌드 타임에 prerender할 경로 결정. 반환되지 않은 경로는 요청 시 동적 생성(default).

```ts
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

// 추가 옵션
export const dynamicParams = false; // generateStaticParams 외 경로는 404
```

## 다음

→ [07_route_groups](../../07_route_groups/lesson.md)
