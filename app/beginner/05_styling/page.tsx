import styles from "./demo.module.css";

export default function Page() {
  return (
    <article className="space-y-6">
      <h1 className="text-2xl font-bold">05. 스타일링</h1>

      <section>
        <h2 className="text-lg font-semibold">A) Tailwind (본 저장소 표준)</h2>
        <p className="text-sm text-[var(--muted)]">
          유틸리티 클래스 조합. 빠른 프로토타이핑과 일관된 스타일.
        </p>
        <div className="mt-2 rounded-lg bg-blue-50 p-4 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200">
          이 박스는 Tailwind 유틸리티만으로 그렸습니다.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">B) CSS Modules</h2>
        <p className="text-sm text-[var(--muted)]">
          파일 단위로 스코프되는 클래스. 클래스명 충돌 걱정 없음.
        </p>
        <div className={styles.card}>
          이 박스는 <code>demo.module.css</code> 의 <code>.card</code> 클래스로 그렸습니다.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">C) 인라인 스타일</h2>
        <div style={{ padding: 12, border: "2px dashed currentColor", borderRadius: 8 }}>
          단발성, 동적 값에만 사용. 디자인 시스템 일관성을 깨므로 남발 금지.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">D) global CSS</h2>
        <p className="text-sm text-[var(--muted)]">
          <code>app/globals.css</code> 한 곳에서 reset, 변수, 베이스만 정의. 컴포넌트 스타일은
          최소화.
        </p>
      </section>
    </article>
  );
}
