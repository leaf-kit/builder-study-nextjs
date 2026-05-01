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
