"use client";

import { useState } from "react";

export function ApiPlayground() {
  const [output, setOutput] = useState<string>("(아직 호출 안 함)");
  const [title, setTitle] = useState("");

  async function callHealth() {
    const r = await fetch("/api/health");
    setOutput(JSON.stringify(await r.json(), null, 2));
  }
  async function callList() {
    const r = await fetch("/api/posts");
    setOutput(JSON.stringify(await r.json(), null, 2));
  }
  async function callCreate() {
    const r = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setOutput(JSON.stringify(await r.json(), null, 2));
    setTitle("");
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={callHealth} className="rounded border border-[var(--border)] px-3 py-1.5 text-sm">
          GET /api/health
        </button>
        <button type="button" onClick={callList} className="rounded border border-[var(--border)] px-3 py-1.5 text-sm">
          GET /api/posts
        </button>
      </div>
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="새 게시글 제목"
          className="flex-1 rounded border border-[var(--border)] px-3 py-1.5 text-sm"
        />
        <button type="button" onClick={callCreate} disabled={!title} className="rounded border border-[var(--border)] px-3 py-1.5 text-sm disabled:opacity-50">
          POST /api/posts
        </button>
      </div>
      <pre className="rounded bg-[rgba(127,127,127,0.12)] p-3 text-xs">{output}</pre>
    </div>
  );
}
