# 05. Tool Use 패턴 — 학습 가이드

## 핵심 개념

LLM 은 자연어 모델. 외부 함수를 호출할 의사를 **메시지로** 표현하고, 우리가 실제 호출하고 결과를 다시 **메시지로** 넣어주면, 모델이 그 결과를 활용해 답변한다.

## 도구 설계 원칙

1. **하나의 도구 = 하나의 책임**: get_weather, search_inventory, send_email
2. **명확한 description**: 모델이 언제 쓸지 결정. 예시까지 포함하면 정확도 ↑
3. **input_schema 는 Zod 와 일치**: 한쪽만 바뀌어도 런타임 사고
4. **idempotent 우선**: 같은 입력에 같은 결과. 부수 효과는 별도 confirmation

## Next.js 통합 형태

| 구성 | 추천 위치 |
|---|---|
| 도구 정의 (스키마) | `lib/tools/schema.ts` |
| 도구 실행 함수 | `lib/tools/exec.ts` (`server-only`) |
| 멀티턴 루프 | Server Action 또는 Route Handler |
| 채팅 UI | 클라이언트 컴포넌트 (스트리밍 폼) |

## 운영 체크리스트

- [ ] tool_use 호출에 사용자 확인이 필요한 도구는 별도 분기 (예: 결제, 메일)
- [ ] 무한 루프 방지: 최대 턴 수 가드 (예: 5턴)
- [ ] 도구 실행 실패 시 tool_result 의 `is_error: true` 로 모델에게 알리기
- [ ] 결과 크기 제한 (수천 토큰 → 요약 후 전달)
- [ ] 로깅: 어떤 도구가 어떤 입력으로 호출됐는지 감사

## 다음

→ 빌더 트랙 끝. README 의 "다음 단계" 참고.
