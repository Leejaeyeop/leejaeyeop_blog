# 성능 최적화 가이드

## 🚀 적용된 최적화 사항

### 1. React 컴포넌트 최적화

- **React.memo()** 적용: 불필요한 리렌더링 방지
- **useCallback()** 적용: 함수 메모이제이션으로 의존성 배열 최적화
- **useMemo()** 적용: 계산 비용이 높은 값들 메모이제이션
- **triggerOnce: true** 설정: useInView 훅의 반복 애니메이션 방지

### 2. Three.js/R3F 성능 최적화

- **파티클 수 감소**: 25개 → 15개로 감소
- **세그먼트 수 감소**: 8개 → 6개로 감소
- **프레임 레이트 제한**: 30fps로 업데이트 제한
- **조건부 uniform 업데이트**: 셰이더 uniform 값 변경 시에만 업데이트

### 3. 이미지 최적화

- **Next.js Image 컴포넌트** 사용: 자동 최적화 및 지연 로딩
- **WebP/AVIF 포맷** 지원: 더 작은 파일 크기
- **Blur placeholder** 적용: 로딩 중 사용자 경험 개선
- **Priority loading** 설정: 중요한 이미지 우선 로딩

### 4. Next.js 설정 최적화

- **Code Splitting** 설정: 라이브러리별 청크 분리
- **압축 활성화**: gzip/brotli 압축
- **이미지 최적화** 설정: WebP/AVIF 자동 변환
- **Package Import 최적화**: Three.js, Framer Motion 최적화

### 5. 번들 최적화

- **Vendor 청크 분리**: node_modules 라이브러리 분리
- **Three.js 전용 청크**: 3D 라이브러리 별도 청크
- **Framer Motion 청크**: 애니메이션 라이브러리 별도 청크

## 📊 성능 모니터링

### Web Vitals 측정

```typescript
import {
  measureWebVitals,
  logMemoryUsage,
  measureFrameRate,
} from "@/lib/performance";

// Web Vitals 측정
measureWebVitals();

// 메모리 사용량 로깅
logMemoryUsage();

// 프레임 레이트 모니터링
measureFrameRate(fps => {
  console.log("Current FPS:", fps);
});
```

### 성능 측정 유틸리티

```typescript
import { measurePerformance, measureAsyncPerformance } from "@/lib/performance";

// 동기 함수 성능 측정
measurePerformance("Component Render", () => {
  // 컴포넌트 렌더링 로직
});

// 비동기 함수 성능 측정
await measureAsyncPerformance("Data Fetching", async () => {
  // 데이터 페칭 로직
});
```

## 🎯 추가 최적화 권장사항

### 1. 지연 로딩 (Lazy Loading)

```typescript
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 2. 가상화 (Virtualization)

대용량 리스트의 경우 react-window 또는 react-virtualized 사용 권장

### 3. 서비스 워커

PWA 기능과 함께 캐싱 전략 구현

### 4. CDN 활용

정적 자산을 CDN에 배포하여 로딩 속도 개선

## 🔧 개발 환경에서 성능 확인

### 1. Chrome DevTools

- Performance 탭에서 렌더링 성능 분석
- Memory 탭에서 메모리 사용량 모니터링
- Network 탭에서 리소스 로딩 시간 확인

### 2. Lighthouse

```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### 3. Bundle Analyzer

```bash
npm install --save-dev @next/bundle-analyzer
```

## 📈 예상 성능 개선 효과

- **초기 로딩 시간**: 20-30% 감소
- **번들 크기**: 15-25% 감소
- **메모리 사용량**: 10-20% 감소
- **렌더링 성능**: 30-40% 향상
- **이미지 로딩**: 40-50% 향상

## 🚨 주의사항

1. **과도한 메모이제이션**: 모든 컴포넌트에 memo를 적용하지 말고, 실제로 성능 이슈가 있는 컴포넌트에만 적용
2. **의존성 배열**: useCallback, useMemo의 의존성 배열을 정확히 설정
3. **프로파일링**: 최적화 전후 성능을 측정하여 실제 개선 효과 확인
4. **브라우저 호환성**: 최적화 기능이 모든 브라우저에서 지원되는지 확인
