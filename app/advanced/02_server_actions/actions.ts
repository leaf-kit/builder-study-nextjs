"use server";

import { revalidatePath } from "next/cache";

type Todo = { id: number; text: string; done: boolean };

let todos: Todo[] = [
  { id: 1, text: "RSC 이해하기", done: true },
  { id: 2, text: "Server Actions 익히기", done: false },
];
let nextId = 3;

export async function listTodos(): Promise<Todo[]> {
  // 학습용으로 약간 지연 추가 — Suspense 와 함께 쓸 때 효과 보기 위함
  await new Promise((r) => setTimeout(r, 100));
  return todos;
}

export async function addTodo(formData: FormData) {
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return;
  todos = [...todos, { id: nextId++, text, done: false }];
  revalidatePath("/advanced/02_server_actions");
}

export async function toggleTodo(id: number) {
  todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  revalidatePath("/advanced/02_server_actions");
}

export async function deleteTodo(id: number) {
  todos = todos.filter((t) => t.id !== id);
  revalidatePath("/advanced/02_server_actions");
}
