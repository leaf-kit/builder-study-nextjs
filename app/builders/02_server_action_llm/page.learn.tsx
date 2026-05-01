// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 02 Server Action 으로 LLM 호출
// 난이도: 빌더 트랙
// 학습 시간: ~25분
// 선행 학습: 03_advanced/02_server_actions
//
// [무엇을 배우는가]
// - useActionState 로 폼 상태 + LLM 결과 통합 처리
// - 서버 액션이 LLM API 호출에 자연스러운 자리인 이유
// - 진행 상태(pending) 표시
//
// [흔한 함정]
// - 토큰 단위 흐름이 필요하면 서버 액션이 아니라 Route Handler + ReadableStream 패턴 사용
// - 액션은 결과를 한 번에 반환 → 길어지는 응답에는 적합하지 않음
// ─────────────────────────────────────────

import { AskForm } from "./ask-form";

export default function Page() {
  return (
    <article>
      <h1 className="text-2xl font-bold">02. Server Action 으로 LLM 호출</h1>
      <p className="mt-2 text-[var(--muted)]">
        폼 제출 → 서버 액션 → LLM 호출 → 결과 반환. 별도 API 라우트 없음.
      </p>
      <div className="mt-4">
        <AskForm />
      </div>
    </article>
  );
}
