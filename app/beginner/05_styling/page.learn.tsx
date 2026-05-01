// ─────────────────────────────────────────
// 파일명: page.learn.tsx
// 토픽: 05 스타일링
// 난이도: 초급
// 학습 시간: ~15분
//
// [무엇을 배우는가]
// 네 가지 스타일링 방식의 사용처와 트레이드오프
// - Tailwind / CSS Modules / 인라인 / global
//
// [고르는 기준]
// - 신규 프로젝트 + 빠른 프로토타이핑 → Tailwind 우선
// - 디자이너가 쓰던 SCSS 파일을 가져오는 경우 → CSS Modules
// - 한 번만 쓰이는 동적 색상 → 인라인 스타일
// - reset, 폰트, CSS 변수 → globals.css
//
// [흔한 함정]
// - global CSS 에 컴포넌트 스타일을 넣기 시작하면 결국 우선순위 지옥
// - Tailwind class를 동적으로 문자열 조합하면 PurgeCSS가 인식 못 해 빌드에서 빠짐
//   → 변수가 들어가는 클래스는 클래스 전체 문자열을 코드에 그대로 두기
// ─────────────────────────────────────────

// CSS Modules: import한 객체의 키가 자동으로 hash 된 클래스명에 매핑됨.
// 예: styles.card → "demo_card__abc123"
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
        {/* dark: 접두사는 prefers-color-scheme: dark 때 적용. 본 저장소는 OS 다크모드를 따라감. */}
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
        {/* React에서 style은 객체. 키는 camelCase, 값은 숫자(픽셀) 또는 문자열. */}
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
