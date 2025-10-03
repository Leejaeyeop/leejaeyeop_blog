/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  poweredByHeader: false, // 보안상 노출 방지

  // 이미지 최적화 설정
  images: {
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl/,
      exclude: /node_modules/,
      type: "asset/source",
    });

    return config;
  },

  // 실험적 기능 (필요할 때만 유지)
  experimental: {
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
};

export default nextConfig;
