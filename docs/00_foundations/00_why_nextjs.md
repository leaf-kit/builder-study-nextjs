# 00. 왜 Next.js인가

> 이 문서를 다 읽으면, "리액트만 쓰면 안 되나? 왜 Next.js를 따로 배우지?" 라는 질문에 스스로 답할 수 있어야 합니다.

---

## React만 쓸 때 부족한 것

리액트(`create-react-app`, Vite + React)는 **UI 라이브러리**입니다. 화면을 그리는 일만 합니다. 실제 웹 앱 하나를 띄우려면 다음을 직접 골라 붙여야 합니다.

| 영역 | React-only | 직접 골라야 할 도구 예시 |
|---|---|---|
| 라우팅 | 없음 | react-router |
| 데이터 페칭 | 없음 | TanStack Query, SWR |
| 서버 사이드 렌더링 (SSR) | 없음 | Express + react-dom/server, Vite SSR |
| 정적 사이트 생성 (SSG) | 없음 | 직접 빌드 스크립트 |
| 이미지 최적화 | 없음 | sharp, 직접 CDN |
| 코드 스플리팅 / 프리페칭 | 수동 | React.lazy + 직접 라우터 통합 |
| API 라우트 | 없음 | Express/Fastify 별도 서버 |
| 폼 / 뮤테이션 | 없음 | 직접 fetch + 상태관리 |
| 메타데이터 / SEO | 수동 | react-helmet 류 |

각각을 골라 붙이면 "내가 만든 미니 프레임워크"가 되는데, 그 결정이 모이면 **유지보수의 시작**입니다. Next.js는 이 모든 결정을 한 묶음으로 제공하는 풀스택 프레임워크입니다.

---

## Next.js가 주는 것 (한 줄씩)

- **라우팅**: 폴더 구조 = URL. 별도 라이브러리 없음.
- **렌더링 모드 자동 선택**: 같은 코드가 SSG/SSR/ISR/CSR을 상황별로 적용.
- **Server Components**: 서버에서 컴포넌트를 렌더하고 결과만 보내 자바스크립트 번들 크기를 줄임.
- **Server Actions**: API 라우트 없이 함수 호출로 뮤테이션.
- **이미지/폰트/스크립트 최적화**: `next/image`, `next/font`가 기본 동작.
- **API 라우트**: `app/.../route.ts` 한 파일로 엔드포인트.
- **빌드/배포 일체**: Vercel·Cloudflare·Node 어디든 동일하게 배포.

---

## "그래서 언제 안 쓰나"

Next.js가 만능은 아닙니다.

- **순수 SPA 대시보드**: 인증 후 들어오는 사내 도구라 SEO/SSR이 무의미하다 → Vite + React가 더 가볍고 빠릅니다.
- **모바일/데스크톱 네이티브 앱**: React Native, Tauri.
- **실시간 양방향 (게임, 협업 에디터)**: Next.js의 강점은 HTTP 요청 흐름. WebSocket 중심 앱은 별도 서버가 필요합니다.
- **마이크로 서비스 / API 서버 단독**: 굳이 Next.js를 쓸 필요 없음 (Hono, Fastify가 더 적절).

> **선택 기준**: "공개 웹 앱 + 페이지 단위 라우팅 + 서버에서 데이터 가져와 그려야 한다"면 Next.js. 위 조건이 약하면 다른 도구.

---

## 다른 프레임워크와의 위치

| 프레임워크 | 핵심 차이 |
|---|---|
| **Remix / React Router v7** | 같은 풀스택 React 프레임워크. loader/action 중심 모델. Next.js는 RSC + Server Actions가 핵심. |
| **SvelteKit** | Svelte 기반. 리액트 진영을 떠나면 강력한 대안. |
| **Astro** | 콘텐츠 사이트 (블로그/문서)에 최적화. island 모델. |
| **Nuxt** | Vue 진영의 Next.js. |

본 저장소는 Next.js + TypeScript에 집중하지만, 위 프레임워크와의 차이는 토픽 곳곳에 비교 박스로 표시합니다.

---

## 다음에 읽을 것

- `01_mental_models.md` — Next.js를 쓰면서 가장 먼저 머릿속을 바꿔야 할 5가지
- `02_runtime_model.md` — 코드가 어디서 (Node? Edge? 브라우저?) 도는가
- `03_ecosystem.md` — pnpm, Turbopack, Vercel 등 주변 도구
