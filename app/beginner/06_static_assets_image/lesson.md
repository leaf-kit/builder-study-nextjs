# 06. 정적 자산과 next/image — 학습 가이드

## public/

- 이 폴더의 파일은 빌드 시점에 그대로 사이트 루트로 복사됨.
- 즉 `public/favicon.ico` → `/favicon.ico`.
- 그러나 **자주 바뀌는 자원, 사용자 업로드** 는 두지 마세요. CDN/오브젝트 스토리지 권장.

## next/image 가 하는 일

1. 요청 시 디바이스에 맞는 사이즈/포맷으로 변환 (Vercel은 sharp 기반)
2. lazy loading (priority 안 주면 기본 lazy)
3. CLS 방지 — 미리 width/height/aspect-ratio 차지
4. blur placeholder (정적 import 사용 시)

## remotePatterns

```ts
// next.config.ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "**.example.com" }, // 와일드카드 OK
  ],
}
```

## 흔한 함정

- **외부 도메인을 안 등록하면**: `Invalid src prop` 에러
- **width/height 미지정**: TS 에러. fill 속성을 쓰려면 부모에 `position: relative` 필요
- **너무 작은 이미지**: `<img>` 가 더 단순할 수 있음

## 다음

→ [07_metadata_seo](../07_metadata_seo/lesson.md)
