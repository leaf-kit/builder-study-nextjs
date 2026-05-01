import type { NextConfig } from "next";

/**
 * Next.js 설정 파일.
 * - TypeScript로 작성 (Next 15+)
 * - 이 학습 저장소는 외부 이미지 도메인 1개만 허용 (06_static_assets_image 토픽에서 사용)
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // 학습 저장소이므로 typedRoutes 는 끔 (상대 쿼리 링크 호환성 우선).
  // 실무에서 켜려면 experimental.typedRoutes: true 추가.
};

export default nextConfig;
