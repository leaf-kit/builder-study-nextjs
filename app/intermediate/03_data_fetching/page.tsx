type Joke = { id: number; type: string; setup: string; punchline: string };

async function getJoke(): Promise<Joke> {
  // next 옵션:
  // - revalidate: 60 → ISR. 60초 동안 캐시 사용, 이후 백그라운드 갱신
  // - tags: ["jokes"] → revalidateTag("jokes") 로 캐시 무효화 가능
  const res = await fetch("https://official-joke-api.appspot.com/random_joke", {
    next: { revalidate: 60, tags: ["jokes"] },
  });
  if (!res.ok) throw new Error("Failed to fetch joke");
  return res.json();
}

export default async function Page() {
  const joke = await getJoke();
  return (
    <article>
      <h1 className="text-2xl font-bold">03. 데이터 페칭</h1>
      <p className="mt-2 text-[var(--muted)]">
        <code>fetch</code> 결과는 60초 동안 Data Cache 에 저장됩니다 (ISR).
      </p>
      <blockquote className="mt-4 border-l-4 border-[var(--accent)] pl-4">
        <p className="font-medium">{joke.setup}</p>
        <p className="mt-2 text-[var(--muted)]">— {joke.punchline}</p>
      </blockquote>
    </article>
  );
}
