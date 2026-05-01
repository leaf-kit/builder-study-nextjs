# 04. 링크와 네비게이션 — 학습 가이드

## 두 가지 네비게이션 도구

| 도구 | 사용 환경 | 용도 |
|---|---|---|
| `<Link href>` | 서버 컴포넌트 OK | 사용자가 **클릭**해서 이동 |
| `useRouter()` | 클라이언트 컴포넌트만 | 폼/효과/조건부 등 **코드로** 이동 |

## `<Link>` 의 자동 동작

1. **prefetch**: 뷰포트에 들어오면 미리 RSC payload 다운로드
2. **부분 네비게이션**: 변경된 라우트 세그먼트만 업데이트
3. **스크롤 복원**: back 했을 때 이전 스크롤 위치

## `useRouter` API

```ts
const router = useRouter();

router.push("/x");        // 히스토리에 추가하며 이동
router.replace("/x");     // 히스토리 교체
router.back();            // 뒤로
router.forward();         // 앞으로
router.refresh();         // RSC payload 다시 가져오기 (페이지 리로드 아님)
router.prefetch("/x");    // 명시적 prefetch
```

## 함정

- 폼 제출 후 이동은 `<form action={action}>` 안에서 `redirect()` 가 더 자연스럽다 (Server Actions 토픽).
- `<a href>` 를 쓰면 풀 페이지 리로드가 됨 (Next.js 라우터를 우회).

## 다음

→ [05_styling](../05_styling/lesson.md)
