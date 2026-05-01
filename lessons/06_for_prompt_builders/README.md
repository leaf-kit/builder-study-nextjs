# lessons/06_for_prompt_builders

본 폴더는 빌더 트랙의 비-라우트 학습 스크립트 자리입니다. 현재는 모든 빌더 트랙 토픽이 `app/builders/` 안에 라우트 형태로 존재하므로 비어 있습니다.

직접 추가해 보고 싶다면:

- `01_messages_create.ts` — Anthropic SDK 의 `messages.create` 단순 호출
- `02_streaming_iter.ts` — `messages.stream` 의 `for await` 패턴
- `03_zod_schema.ts` — Zod + zod-to-json-schema 로 tool 스키마 자동 생성

```bash
pnpm tsx lessons/06_for_prompt_builders/<file>.ts
```
