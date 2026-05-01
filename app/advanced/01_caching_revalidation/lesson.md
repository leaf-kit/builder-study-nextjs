# 01. 캐시와 재검증 — 학습 가이드

## 4겹 캐시 다시 보기

```
1) Request Memoization   ─ React.cache / fetch dedup, 한 요청 안에서만
2) Data Cache            ─ fetch / unstable_cache 결과, 영속
3) Full Route Cache      ─ 정적 라우트의 HTML/RSC payload
4) Router Cache          ─ 브라우저 측 prefetch 결과
```

## 시간 기반 vs 태그 기반 무효화

| 방식 | 트리거 | 사용처 |
|---|---|---|
| `revalidate: 60` | 60초 후 첫 요청에서 백그라운드 갱신 | 자주 안 바뀌는 데이터 (블로그) |
| `tags: ["posts"]` + `revalidateTag("posts")` | 명시적 호출 | 뮤테이션 후 즉시 갱신 |
| `revalidatePath("/posts")` | 명시적 호출 | 그 라우트의 Full Route Cache 무효화 |

## fetch vs unstable_cache

| | fetch | unstable_cache |
|---|---|---|
| 자동 캐시 | ✅ (옵션 따라) | ❌ 명시적 사용 |
| 임의 함수 (DB 등) 캐시 | ❌ | ✅ |
| 키 자동 생성 | URL+옵션 | 수동 지정 |

## 정적/동적 결정 요인

라우트가 정적(prerender)으로 처리되려면:
- `cookies()`, `headers()`, `searchParams` 사용 안 함
- `cache: "no-store"` fetch 없음
- `export const dynamic = "force-dynamic"` 없음

위 중 하나라도 깨지면 동적 렌더로 전환.

## 다음

→ [02_server_actions](../02_server_actions/lesson.md)
