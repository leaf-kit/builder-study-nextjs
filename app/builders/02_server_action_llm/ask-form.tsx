"use client";

import { useActionState } from "react";
import { ask, type AskState } from "./actions";

const INITIAL: AskState = { answer: null, error: null };

export function AskForm() {
  const [state, formAction, pending] = useActionState(ask, INITIAL);

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-2">
        <textarea
          name="prompt"
          rows={3}
          placeholder="LLM 에 보낼 프롬프트"
          className="rounded border border-[var(--border)] px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="self-start rounded border border-[var(--border)] px-3 py-1.5 text-sm disabled:opacity-50"
        >
          {pending ? "생성 중..." : "보내기"}
        </button>
      </form>

      {state.error && (
        <p className="mt-3 rounded border border-red-500/30 bg-red-50 p-2 text-sm text-red-700 dark:bg-red-950/20">
          {state.error}
        </p>
      )}

      {state.answer && (
        <pre className="mt-3 whitespace-pre-wrap rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">
          {state.answer}
        </pre>
      )}
    </div>
  );
}
