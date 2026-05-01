# Next.js Study — 빌더들을 위한 프로그래밍 언어 공부 저장소

> **컨셉**: "AI/LLM 시대의 빌더(builder)" 가 직접 제품을 만들 수 있도록 설계된 Next.js + TypeScript 학습 저장소. 단순 문법 나열이 아니라 **왜 / 언제 / 어떻게 다른 개념과 연결되는가** 를 코드와 주석으로 가르치는 살아있는 교재.

> 모든 토픽이 **`page.tsx` (raw) + `page.learn.tsx` (주석 가득) + `lesson.md` (가이드)** 세 파일로 구성되어, 학습자는 (1) 깔끔한 실무 코드와 (2) 모든 줄이 설명된 학습 코드를 나란히 비교하면서 익힙니다.

### 누구를 위한 저장소인가

이 저장소는 **빌더(builder)** — 즉 LLM/프롬프트 엔지니어링·AI 제품·풀스택 사이드 프로젝트를 직접 만드는 사람 — 을 위해 설계되었습니다. 그래서 일반 Next.js 튜토리얼과 다음이 다릅니다:

- **6번 트랙 `06_for_prompt_builders/`** 가 가이드라인보다 의도적으로 강화됨 — Next.js 위에서 LLM 스트리밍·Zod 구조화 출력·RAG·tool use 까지 한 번에 익힘
- 모든 비-자명한 동작에 **"왜 이렇게 동작하는가 / 다른 언어와 어떻게 다른가"** 를 짧게 설명
- TypeScript 는 별도 토픽이 아니라 **모든 코드의 기본 언어** — 빌더가 LLM 도구 시그니처/Zod 스키마를 다루기 위한 기본기로 다룸
- 의존성과 설정을 최소화 — `pnpm install && pnpm dev` 로 즉시 모든 토픽이 동작

### 메타

- **마지막 업데이트**: 2026-05-02
- **Next.js 버전**: 15.x
- **React 버전**: 19.x
- **도달 수준**: 실무 투입 가능 (App Router, RSC, Server Actions, 캐시·재검증, LLM 통합 패턴)
- **예상 총 학습 시간**: 약 12~16시간 (실습 포함)

---

## Quick Start

### 1) 사전 요구사항

| 도구 | 최소 버전 | 확인 명령 |
|---|---|---|
| Node.js | 18.18+ | `node -v` |
| pnpm | 9+ (권장) | `pnpm -v` |
| VS Code | 최신 | — |

> pnpm 이 없다면: `corepack enable pnpm` (Node 16.13+) 또는 `npm i -g pnpm` 또는 `brew install pnpm`.

> npm/yarn 으로도 동작합니다. 본 README의 `pnpm` 을 자유롭게 `npm`/`yarn` 으로 바꿔도 됩니다.

### 2) 의존성 설치 & 첫 실행

```bash
git clone <this-repo>
cd nextjs-study
pnpm install
pnpm dev          # http://localhost:3000
```

`http://localhost:3000` 을 열면 학습 인덱스가 뜨고, 거기서 모든 토픽을 클릭으로 탐색할 수 있습니다.

### 3) VS Code 에서 실행 / 디버깅

1. 폴더를 VS Code 로 엽니다.
2. 우측 하단에 "추천 확장 설치" 알림이 뜨면 **"Install All"** (또는 [.vscode/extensions.json](.vscode/extensions.json) 의 6개 확장 수동 설치).
3. 첫 학습 파일 열기: `app/beginner/01_project_setup/page.learn.tsx`
4. **F5** (또는 Run 패널 → "Next.js: 서버 디버그 (dev)") 누르면 서버가 디버그 모드로 뜨면서 브레이크포인트가 작동합니다.
5. 클라이언트 컴포넌트 디버그가 필요하면 **"Next.js: 풀스택 디버그"** compound 사용.
6. `lessons/**/*.ts` 같은 비-라우트 학습 스크립트는 그 파일을 열고 **F5** ("lessons/: 현재 파일 실행 (tsx)" 설정).

### 4) 터미널 명령 모음

```bash
pnpm dev          # 개발 서버 (Turbopack)
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버 실행
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
pnpm format       # prettier --write
pnpm tsx <path>   # 비-라우트 학습 스크립트 실행
                  # 예: pnpm tsx lessons/05_idioms/01_typescript_idioms.ts
```

### 5) 키보드 단축키 치트시트 (VS Code)

| 단축키 | 동작 |
|---|---|
| **F5** | 현재 파일 실행/디버깅 (launch.json 첫 설정) |
| **⌘⇧B** / Ctrl+Shift+B | 빌드 태스크 (build) |
| **⌘⇧P** → "Tasks: Run Task" | tasks.json 의 모든 태스크 |
| **⌘P** | 파일 빠른 열기 |
| **F12** | 정의로 이동 |
| **⌥+⇧+F** / Alt+Shift+F | 포맷 적용 |

---

## 이 언어를 이해하기 위해 필요한 기초지식

### 필수
- **JavaScript ES2020+** — async/await, destructuring, template literals
- **React 기본** — JSX, 컴포넌트, props, 단방향 데이터 흐름
- **HTTP 기초** — request/response, status codes, cookies, headers

### 있으면 좋은 것
- TypeScript 기본 (타입 별칭, 제네릭) — 0부터 익히면서 진행해도 됨
- 어떤 다른 풀스택 프레임워크 경험 (Rails, Django, Spring 등)

### 다른 언어/프레임워크 경험자라면 가장 먼저 머릿속을 바꿔야 할 점

| 출발점 | 바꿔야 할 것 |
|---|---|
| **CRA / Vite + React** | "리액트인데 useState/useEffect 가 기본이 아니다" — 서버 컴포넌트가 기본 |
| **Express / Fastify** | API 라우트는 부산물. 폼 뮤테이션은 Server Actions 가 자연스러움 |
| **PHP / Rails** | "URL 라우터 설정"이 없다. 폴더 구조가 라우팅 |
| **Vue / Svelte** | 컴포넌트 리액티비티가 다름. RSC는 서버에서 한 번만 렌더 |

---

## 어떤 관점에서 익혀야 하는가

### 이 프레임워크의 철학

1. **렌더링 위치는 코드가 결정한다, 프레임워크가 강제하지 않는다**: 같은 컴포넌트를 RSC/Client/Static/Dynamic 어디로든 부드럽게 이동.
2. **자바스크립트는 적게**: 서버에서 끝낼 일은 끝내고, 브라우저는 인터랙션만.
3. **컨벤션 위에 명시 1줄**: `"use client"`, `"use server"`, `export const dynamic`, `revalidate` 같은 한 줄 선언으로 동작이 결정.
4. **네트워크는 비용**: prefetch, 캐시, streaming 이 기본값. 끄는 것은 명시적.

### "이 언어로 사고하기"

같은 "게시글 목록 + 댓글 작성" 기능을 다음 두 방식으로 구현하면 차이가 보입니다:

| | 옛 방식 (CSR + REST) | Next.js 방식 |
|---|---|---|
| 데이터 | 클라가 fetch + useEffect | 서버 컴포넌트가 await fetch |
| 댓글 작성 | onSubmit + fetch + invalidate | `<form action={addComment}>` |
| 로딩 UX | 컴포넌트별 isLoading | `loading.tsx` + `<Suspense>` |
| 인증 | 인터셉터 | `middleware.ts` + DAL |

후자는 **클라이언트 자바스크립트가 거의 없는** 페이지로 끝납니다.

---

## 학습 로드맵

```
00_foundations  →  01_beginner  →  02_intermediate  →  03_advanced
                                                              ├──→  04_design_patterns
                                                              ├──→  05_idioms
                                                              └──→  06_for_prompt_builders
```

> 처음이면 [`docs/00_foundations/00_why_nextjs.md`](docs/00_foundations/00_why_nextjs.md) → [`01_mental_models.md`](docs/00_foundations/01_mental_models.md) 부터.

---

## 전체 목차

라우트 컬럼은 `pnpm dev` 후 `http://localhost:3000` 기준입니다.

### 00. Foundations (개념)

| # | 토픽 | 파일 |
|---|---|---|
| 00 | 왜 Next.js | [docs/00_foundations/00_why_nextjs.md](docs/00_foundations/00_why_nextjs.md) |
| 01 | 5가지 멘탈 모델 | [docs/00_foundations/01_mental_models.md](docs/00_foundations/01_mental_models.md) |
| 02 | 런타임 모델 | [docs/00_foundations/02_runtime_model.md](docs/00_foundations/02_runtime_model.md) |
| 03 | 생태계 | [docs/00_foundations/03_ecosystem.md](docs/00_foundations/03_ecosystem.md) |

### 01. Beginner (8개)

| # | 토픽 | 학습 파일 (.learn) | raw 파일 | 가이드 | 라우트 | 다루는 개념 | 어디에 쓰는가 |
|---|---|---|---|---|---|---|---|
| 01 | 프로젝트 셋업 | [.learn](app/beginner/01_project_setup/page.learn.tsx) | [raw](app/beginner/01_project_setup/page.tsx) | [📘](app/beginner/01_project_setup/lesson.md) | `/beginner/01_project_setup` | 디렉토리 의미, 명령어 | 신규 프로젝트 시작 |
| 02 | 페이지와 라우트 | [.learn](app/beginner/02_pages_routes/page.learn.tsx) | [raw](app/beginner/02_pages_routes/page.tsx) | [📘](app/beginner/02_pages_routes/lesson.md) | `/beginner/02_pages_routes` | page.tsx, 서버 컴포넌트 기본값 | 정적 페이지 추가 |
| 03 | 레이아웃 | [.learn](app/beginner/03_layouts/page.learn.tsx) | [raw](app/beginner/03_layouts/page.tsx) | [📘](app/beginner/03_layouts/lesson.md) | `/beginner/03_layouts` | layout.tsx, 중첩, 상태 보존 | 사이드바, 헤더 분리 |
| 04 | 링크와 네비게이션 | [.learn](app/beginner/04_link_navigation/page.learn.tsx) | [raw](app/beginner/04_link_navigation/page.tsx) | [📘](app/beginner/04_link_navigation/lesson.md) | `/beginner/04_link_navigation` | `<Link>`, useRouter, prefetch | SPA 같은 부분 네비 |
| 05 | 스타일링 | [.learn](app/beginner/05_styling/page.learn.tsx) | [raw](app/beginner/05_styling/page.tsx) | [📘](app/beginner/05_styling/lesson.md) | `/beginner/05_styling` | Tailwind, CSS Modules, 인라인 | 디자인 시스템 도입 |
| 06 | 정적 자산과 next/image | [.learn](app/beginner/06_static_assets_image/page.learn.tsx) | [raw](app/beginner/06_static_assets_image/page.tsx) | [📘](app/beginner/06_static_assets_image/lesson.md) | `/beginner/06_static_assets_image` | public/, next/image | 이미지 최적화 |
| 07 | Metadata와 SEO | [.learn](app/beginner/07_metadata_seo/page.learn.tsx) | [raw](app/beginner/07_metadata_seo/page.tsx) | [📘](app/beginner/07_metadata_seo/lesson.md) | `/beginner/07_metadata_seo` | metadata API, OG | 마케팅 페이지, 블로그 |
| 08 | TS Props/params | [.learn](app/beginner/08_typescript_props/page.learn.tsx) | [raw](app/beginner/08_typescript_props/page.tsx) | [📘](app/beginner/08_typescript_props/lesson.md) | `/beginner/08_typescript_props?q=hello&sort=desc` | params/searchParams 타입 | 검색·필터 UI |

### 02. Intermediate (8개)

| # | 토픽 | 학습 | raw | 가이드 | 라우트 |
|---|---|---|---|---|---|
| 01 | Server Components | [.learn](app/intermediate/01_server_components/page.learn.tsx) | [raw](app/intermediate/01_server_components/page.tsx) | [📘](app/intermediate/01_server_components/lesson.md) | `/intermediate/01_server_components` |
| 02 | Client Components | [.learn](app/intermediate/02_client_components/page.learn.tsx) | [raw](app/intermediate/02_client_components/page.tsx) | [📘](app/intermediate/02_client_components/lesson.md) | `/intermediate/02_client_components` |
| 03 | 데이터 페칭 | [.learn](app/intermediate/03_data_fetching/page.learn.tsx) | [raw](app/intermediate/03_data_fetching/page.tsx) | [📘](app/intermediate/03_data_fetching/lesson.md) | `/intermediate/03_data_fetching` |
| 04 | 로딩과 스트리밍 | [.learn](app/intermediate/04_loading_streaming/page.learn.tsx) | [raw](app/intermediate/04_loading_streaming/page.tsx) | [📘](app/intermediate/04_loading_streaming/lesson.md) | `/intermediate/04_loading_streaming` |
| 05 | 에러 바운더리 | [.learn](app/intermediate/05_error_boundaries/page.learn.tsx) | [raw](app/intermediate/05_error_boundaries/page.tsx) | [📘](app/intermediate/05_error_boundaries/lesson.md) | `/intermediate/05_error_boundaries` |
| 06 | 동적 라우트 | [.learn](app/intermediate/06_dynamic_routes/[slug]/page.learn.tsx) | [raw](app/intermediate/06_dynamic_routes/[slug]/page.tsx) | [📘](app/intermediate/06_dynamic_routes/[slug]/lesson.md) | `/intermediate/06_dynamic_routes/hello` |
| 07 | 라우트 그룹/parallel | [.learn](app/intermediate/07_route_groups/page.learn.tsx) | [raw](app/intermediate/07_route_groups/page.tsx) | [📘](app/intermediate/07_route_groups/lesson.md) | `/intermediate/07_route_groups` |
| 08 | Route Handlers | [.learn](app/intermediate/08_route_handlers/page.learn.tsx) | [raw](app/intermediate/08_route_handlers/page.tsx) | [📘](app/intermediate/08_route_handlers/lesson.md) | `/intermediate/08_route_handlers` |

### 03. Advanced (4개)

| # | 토픽 | 학습 | raw | 가이드 | 라우트 |
|---|---|---|---|---|---|
| 01 | 캐시와 재검증 | [.learn](app/advanced/01_caching_revalidation/page.learn.tsx) | [raw](app/advanced/01_caching_revalidation/page.tsx) | [📘](app/advanced/01_caching_revalidation/lesson.md) | `/advanced/01_caching_revalidation` |
| 02 | Server Actions | [.learn](app/advanced/02_server_actions/page.learn.tsx) | [raw](app/advanced/02_server_actions/page.tsx) | [📘](app/advanced/02_server_actions/lesson.md) | `/advanced/02_server_actions` |
| 03 | Middleware | [.learn](app/advanced/03_middleware/page.learn.tsx) | [raw](app/advanced/03_middleware/page.tsx) | [📘](app/advanced/03_middleware/lesson.md) | `/advanced/03_middleware` |
| 04 | Intercepting Routes | [.learn](app/advanced/04_intercepting_routes/page.learn.tsx) | [raw](app/advanced/04_intercepting_routes/page.tsx) | [📘](app/advanced/04_intercepting_routes/lesson.md) | `/advanced/04_intercepting_routes` |

### 04. Design Patterns

| # | 토픽 | 학습 | raw | 가이드 | 라우트 |
|---|---|---|---|---|---|
| 01 | Container/Presenter | [.learn](app/patterns/01_container_presenter/page.learn.tsx) | [raw](app/patterns/01_container_presenter/page.tsx) | [📘](app/patterns/01_container_presenter/lesson.md) | `/patterns/01_container_presenter` |
| 02 | Data Access Layer | [.learn](app/patterns/02_data_access_layer/page.learn.tsx) | [raw](app/patterns/02_data_access_layer/page.tsx) | [📘](app/patterns/02_data_access_layer/lesson.md) | `/patterns/02_data_access_layer` |

### 05. Idioms

| # | 토픽 | 학습 | raw | 가이드 | 라우트 / 실행 |
|---|---|---|---|---|---|
| 01 | TypeScript 관용구 | [.learn (page)](app/idioms/01_typescript/page.learn.tsx) / [.learn (run)](lessons/05_idioms/01_typescript_idioms.learn.ts) | [raw (page)](app/idioms/01_typescript/page.tsx) / [raw (run)](lessons/05_idioms/01_typescript_idioms.ts) | [📘](app/idioms/01_typescript/lesson.md) | `/idioms/01_typescript` 또는 `pnpm tsx lessons/05_idioms/01_typescript_idioms.ts` |
| 02 | Next.js 관용구 | [.learn](app/idioms/02_nextjs/page.learn.tsx) | [raw](app/idioms/02_nextjs/page.tsx) | [📘](app/idioms/02_nextjs/lesson.md) | `/idioms/02_nextjs` |

### 06. For Prompt Builders

| # | 토픽 | 학습 | raw | 가이드 | 라우트 |
|---|---|---|---|---|---|
| 01 | 스트리밍 LLM | [.learn](app/builders/01_streaming_llm/page.learn.tsx) | [raw](app/builders/01_streaming_llm/page.tsx) | [📘](app/builders/01_streaming_llm/lesson.md) | `/builders/01_streaming_llm` |
| 02 | Server Action으로 LLM | [.learn](app/builders/02_server_action_llm/page.learn.tsx) | [raw](app/builders/02_server_action_llm/page.tsx) | [📘](app/builders/02_server_action_llm/lesson.md) | `/builders/02_server_action_llm` |
| 03 | Zod 구조화 출력 | [.learn](app/builders/03_structured_outputs/page.learn.tsx) | [raw](app/builders/03_structured_outputs/page.tsx) | [📘](app/builders/03_structured_outputs/lesson.md) | `/builders/03_structured_outputs` |
| 04 | RAG 골격 | [.learn](app/builders/04_rag_skeleton/page.learn.tsx) | [raw](app/builders/04_rag_skeleton/page.tsx) | [📘](app/builders/04_rag_skeleton/lesson.md) | `/builders/04_rag_skeleton?q=RSC` |
| 05 | Tool Use 패턴 | [.learn](app/builders/05_tool_use/page.learn.tsx) | [raw](app/builders/05_tool_use/page.tsx) | [📘](app/builders/05_tool_use/lesson.md) | `/builders/05_tool_use` |

---

## 프롬프트 엔지니어/빌더 관점에서 Next.js 를 본다면

### 강점

- **RSC streaming + Suspense**: LLM 토큰 스트리밍과 자연스럽게 결합. 서버 컴포넌트가 비동기 generator 같은 모양을 자연스럽게 표현.
- **Server Actions**: 폼 → LLM → 결과 흐름이 단 한 함수로 표현. progressive enhancement 까지 무료.
- **Edge 런타임**: 짧은 cold start 와 글로벌 분산이 LLM 호출 응답 latency 단축에 유리. middleware 로 사용량 제한, 인증 게이트.
- **TypeScript + Zod 조합**: 도구(tool) 입출력 스키마와 컴파일 타입 단일 소스.

### 약점/주의

- **Streaming 의 두 모델**: RSC streaming 은 토큰 단위 표시 X (한 컴포넌트가 끝나야 표시). 토큰 단위는 Route Handler + ReadableStream + 클라이언트 디코더.
- **장시간 실행**: Vercel Edge 의 max duration 제한. 길게 도는 에이전트는 Node 런타임 + 큐 시스템 권장.
- **함수 호출(tool use) 멀티턴**: Server Action 의 단일 응답 모델과는 잘 안 맞음 → Route Handler + 자체 폴링/스트리밍 권장.
- **토큰 비용**: 캐시(unstable_cache)로 동일 입력 재호출 비용을 0 으로.

### 프로덕션 LLM 앱에서 Next.js 선택 시 고려

- 사용자 노출 UI 가 큰가? → 강함
- 에이전트가 분 단위로 도는가? → 큐 + 별도 워커 분리 권장
- 다중 tenant + 사용량 미터링? → middleware 가 좋은 자리
- WebSocket 양방향이 핵심? → 별도 서버 (Next.js 의 우위 영역 아님)

---

## 트러블슈팅

| 증상 | 확인 |
|---|---|
| F5 눌렀는데 실행 안 됨 | (1) `pnpm install` 실행 여부, (2) `.vscode/launch.json` 의 runtimeExecutable 경로, (3) Node 18.18+ |
| `Cannot find module 'next'` | `pnpm install` 미실행 |
| 포트 3000 충돌 | `PORT=3001 pnpm dev` |
| `Hydration failed` 빨간 에러 | 서버/클라 렌더 결과 불일치. 가장 흔한 원인: `Date.now()`, `Math.random()`, `localStorage` 를 컴포넌트 본문에서 직접 사용 → useEffect 안으로 이동 |
| `process.env.X is undefined` (브라우저) | `NEXT_PUBLIC_` 접두사 필요 |
| 외부 이미지가 안 뜸 | `next.config.ts` 의 `images.remotePatterns` 등록 |
| 폼 제출 시 "use server" 에러 | 액션 파일 맨 위에 `"use server"`, 함수는 async, default export 가 아니라 named export |
| Tailwind 클래스가 적용 안 됨 | 동적 문자열 (`\`bg-${color}\``) 은 PurgeCSS 가 못 찾음 → 전체 클래스명을 코드에 그대로 두기 |

---

## 학습 후 다음 단계

### 추천 프로젝트 (난이도별)

1. **블로그 (입문)**: `[slug]` 동적 라우트 + Markdown 파싱 + 정적 prerender (`generateStaticParams`)
2. **할 일 앱 + 인증 (중급)**: Auth.js + DB(Drizzle/Prisma) + Server Actions 로 CRUD + revalidatePath
3. **LLM 챗봇 + RAG (고급)**: 본 저장소 06번 트랙 확장 — 임베딩 인덱스 + 멀티턴 + tool use + 스트리밍 UI

### 더 깊이 파고들 주제

- **Partial Prerendering (PPR)**: 정적 셸 + 동적 hole 의 미래 모델
- **`react.cache` + DAL**: 요청-스코프 메모이제이션
- **`unstable_after`**: 응답 후 백그라운드 작업
- **Edge에서의 cold start 최소화**: bundle 분석, dynamic import

### 신뢰할 수 있는 외부 자료

- 공식 문서: https://nextjs.org/docs
- React 공식: https://react.dev (RSC 개념)
- Anthropic Claude API: https://docs.claude.com/en/docs

---

## 디렉토리 한눈에

```
nextjs-study/
├── README.md          ← 지금 보는 파일
├── PLAN.md            ← 사전 설계
├── app/               ← Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx       ← 학습 인덱스
│   ├── beginner/...
│   ├── intermediate/...
│   ├── advanced/...
│   ├── patterns/...
│   ├── idioms/...
│   ├── builders/...
│   └── api/...        ← Route Handlers
├── lessons/           ← 비-라우트 학습 스크립트
│   └── 05_idioms/
├── lib/               ← 공유 모듈 (server-only)
├── docs/              ← Foundations 마크다운
├── public/
├── middleware.ts      ← 03_advanced/03_middleware 토픽이 사용
└── .vscode/           ← 즉시 F5 가능하도록 미리 설정
```
