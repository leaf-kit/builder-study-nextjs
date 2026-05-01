# 03. 생태계 — 주변 도구와의 관계

> 본 학습 저장소가 채택한 도구의 "왜"를 설명합니다.

---

## 패키지 매니저: pnpm

| 도구 | 디스크 효율 | 속도 | 모노레포 | 비고 |
|---|---|---|---|---|
| npm | 보통 | 보통 | 워크스페이스 지원 | 기본 동봉 |
| yarn (classic) | 보통 | 빠름 | 부분 | 점차 지양 |
| yarn berry | 좋음 | 빠름 | 강력 | PnP 호환 이슈 가끔 |
| **pnpm** | **최고 (hard link)** | **빠름** | **강력** | Vercel 권장 |
| bun | 최고 | 매우 빠름 | 좋음 | 일부 npm 패키지 호환 이슈 |

본 저장소는 **pnpm** 기준이지만, npm/yarn으로도 동일하게 동작합니다 (`pnpm`을 `npm` 또는 `yarn`으로 바꾸면 끝).

```bash
# 처음 한 번
brew install pnpm   # macOS
# 또는
corepack enable pnpm  # Node 16.13+
```

---

## 빌드 도구: Turbopack (dev) + webpack (build)

- **dev 모드**: Next.js 15부터 Turbopack이 stable. `next dev --turbopack`.
- **production build**: 아직 webpack이 기본 (Turbopack build는 베타).
- 학습자에게: `pnpm dev` 시 콘솔에 "Turbopack"이 표시되면 정상입니다.

---

## 호스팅

Next.js는 빌드 결과물에 따라 다양한 곳에 배포됩니다.

| 호스팅 | 특징 |
|---|---|
| **Vercel** | Next.js를 만든 회사. 모든 기능 100% 지원. zero-config. |
| **Cloudflare Pages / Workers** | Edge 중심. Node 런타임 일부 제약. `next-on-pages`. |
| **AWS Amplify / SST** | AWS 통합. SST가 좀 더 유연. |
| **Netlify** | Vercel과 비슷한 DX. 일부 기능 차이. |
| **자체 Node 서버** | `pnpm build && pnpm start` — 어디든. Server Actions, ISR, 이미지 최적화 모두 동작. |
| **Docker** | 자체 호스팅 표준. Next.js 공식 Dockerfile 가이드 존재. |

본 저장소는 **자체 Node 서버 / 로컬**에서 동작하도록 작성되었습니다. Vercel 배포는 그저 `git push` 한 번이면 됩니다.

---

## 함께 쓰는 도구들 (선택)

### 데이터/백엔드
- **Prisma** — ORM. Next.js와 잘 맞음.
- **Drizzle** — 더 가벼운 TS-first ORM.
- **Supabase / Neon / Turso** — 서버리스 Postgres.
- **Upstash Redis** — Edge 호환 Redis.

### UI
- **Tailwind CSS** — 본 저장소 채택.
- **shadcn/ui** — Radix + Tailwind 조합 컴포넌트 모음.
- **Radix UI / Headless UI** — 동작만 제공, 스타일 자유.

### 폼/검증
- **Zod** — 본 저장소 채택. Server Actions 입력 검증의 표준.
- **react-hook-form** — 클라이언트 폼.
- **Conform** — Server Actions와 React 19 폼 통합 친화.

### LLM (06_for_prompt_builders 트랙)
- **@anthropic-ai/sdk** — Claude API 공식 SDK.
- **Vercel AI SDK** — 멀티 프로바이더 + 스트리밍 헬퍼.

### 인증
- **Auth.js (NextAuth)** — 폭넓은 프로바이더.
- **Clerk** — managed 인증.
- **Lucia** — 가벼운 self-hosted.

---

## TypeScript 설정의 핵심

본 저장소의 `tsconfig.json` 핵심 옵션과 의미:

| 옵션 | 값 | 왜 |
|---|---|---|
| `strict` | `true` | 타입 안전성의 기본. 끄지 마세요. |
| `noUncheckedIndexedAccess` | `true` | `arr[0]`이 `T \| undefined`로 추론 — 배열 인덱싱 버그 사전 방지. |
| `moduleResolution` | `"bundler"` | Next.js와 가장 호환 좋음. |
| `paths` | `{ "@/*": ["./*"] }` | `import x from "@/lib/x"` 가능. |

`noUncheckedIndexedAccess`는 처음엔 거슬리지만, 배열 접근 버그를 컴파일 타임에 잡아주니 익숙해지면 못 끕니다.

---

## 학습 저장소가 의도적으로 **안 쓴** 것

학습 부담을 줄이기 위해 다음은 도입하지 않았습니다.

- **상태 관리 라이브러리** (Zustand, Redux, Jotai) — RSC + Server Actions로 대부분 해결되며, 학습 단계에서 굳이.
- **테스트 프레임워크** (Vitest, Playwright) — 실무에서 필수지만 본 저장소는 "Next.js 자체"에 집중.
- **CI/CD 설정** — GitHub Actions 예시는 README에 텍스트로만 안내.
- **Storybook** — 대형 팀의 도구.

이 도구들이 필요하다고 느낄 즈음이면 이미 실무 투입 가능 수준입니다.
