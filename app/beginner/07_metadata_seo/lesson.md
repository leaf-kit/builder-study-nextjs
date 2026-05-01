# 07. Metadata와 SEO — 학습 가이드

## 두 가지 metadata API

| | 사용법 | 언제 |
|---|---|---|
| 정적 | `export const metadata: Metadata = {...}` | 항상 같음 |
| 동적 | `export async function generateMetadata({ params })` | params/searchParams 따라 다름 |

## 병합 규칙

- 루트 `app/layout.tsx` 의 metadata + 하위 layout/page 의 metadata 가 **합쳐짐**.
- 같은 키는 **하위가 덮어씀**.
- `title.template` 가 루트에 있으면 자식 title 이 그 템플릿에 들어감 (본 저장소는 `"%s · Next.js Study"` 사용).

## SEO 체크리스트

- `title`, `description` (필수)
- `openGraph.title/description/image/type` (소셜 미리보기)
- `twitter.card` (트위터 미리보기)
- `robots` (인덱싱 제어)
- `alternates.canonical` (중복 URL 방지)
- `sitemap.ts`, `robots.ts` 파일 (별도 생성)

## 다음

→ [08_typescript_props](../08_typescript_props/lesson.md)
