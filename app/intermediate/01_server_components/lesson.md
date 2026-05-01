# 01. Server Components — 학습 가이드

## 한 줄 정의

서버에서 렌더링이 끝나고 **자바스크립트가 클라이언트로 전송되지 않는** 컴포넌트.

## 왜 도입됐나

| 문제 | RSC 전 | RSC 후 |
|---|---|---|
| 큰 차트 라이브러리를 SEO 위해 SSR | 클라가 라이브러리 다시 다운로드 | 서버에서만 실행, 결과만 전송 |
| DB 직접 접근 | 별도 API 라우트 필요 | 컴포넌트 안에서 `await db.query()` |
| 비밀 키 사용 | 환경 분리 까다로움 | 서버에만 존재 |

## 무엇을 못 하는가

- `useState`, `useEffect`, `useRef` 등 React 클라이언트 훅
- 이벤트 핸들러 (`onClick`, `onChange`)
- 브라우저 전역 (`window`, `localStorage`)

→ 이런 게 필요하면 **클라이언트 컴포넌트** 로 분리해서 import (다음 토픽).

## dynamic API 가 트리거하는 동작

다음을 **호출**한 라우트는 정적 prerender 가 자동 해제되고 매 요청마다 동적으로 렌더됩니다.

- `cookies()`
- `headers()`
- `searchParams` 사용
- `noStore()` (Next.js 14)
- `connection()` 등

## 다음

→ [02_client_components](../02_client_components/lesson.md)
