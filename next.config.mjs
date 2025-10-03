/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // 성능 최적화 설정
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // 이미지 최적화 설정
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 번들 분석 및 최적화
  webpack: (config, { dev, isServer }) => {
    // GLSL 셰이더 지원
    config.module.rules.push({
      test: /\.glsl/,
      exclude: /node_modules/,
      type: "asset/source",
    });

    // 프로덕션 빌드 최적화
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: "three",
            chunks: "all",
            priority: 10,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: "framer",
            chunks: "all",
            priority: 10,
          },
        },
      };
    }

    return config;
  },

  // 실험적 기능
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
};

export default nextConfig;
