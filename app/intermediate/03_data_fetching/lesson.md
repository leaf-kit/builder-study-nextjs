# 03. 데이터 페칭 — 학습 가이드

## 핵심 표

| 옵션 | 동작 | 캐시 위치 |
|---|---|---|
| `fetch(url)` | 기본: force-cache (Next.js 14) / no-store (Next.js 15+) | Data Cache |
| `fetch(url, { cache: "force-cache" })` | 영구 캐시 | Data Cache |
| `fetch(url, { cache: "no-store" })` | 매번 호출 | 안 함 |
| `fetch(url, { next: { revalidate: 60 } })` | 60초 후 stale, 갱신 | Data Cache |
| `fetch(url, { next: { tags: ["x"] } })` | 태그 기반 무효화 | Data Cache |

> **중요**: Next.js 15부터 fetch 의 기본값이 변경됨. 이전 코드는 명시적으로 `cache: "force-cache"` 를 적어주거나 `revalidate` 를 쓰는 것이 안전.

## 패턴: 병렬 페칭

```tsx
async function Page() {
  const [posts, users] = await Promise.all([getPosts(), getUsers()]);
  return ...;
}
```

## 패턴: 순차 페칭 (의존성 있을 때)

```tsx
const post = await getPost(slug);
const author = await getUser(post.authorId);
```

## 안티패턴

```tsx
// ❌ N+1 문제
const posts = await getPosts();
for (const post of posts) {
  post.author = await getUser(post.authorId); // 매번 fetch
}

// ✅ 배치
const posts = await getPosts();
const authors = await getUsers(posts.map(p => p.authorId));
```

## 다음

→ [04_loading_streaming](../04_loading_streaming/lesson.md)
