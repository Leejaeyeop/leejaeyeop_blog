// 성능 모니터링 유틸리티

export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== "undefined" && "performance" in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

export const measureAsyncPerformance = async (
  name: string,
  fn: () => Promise<void>
) => {
  if (typeof window !== "undefined" && "performance" in window) {
    const start = performance.now();
    await fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    await fn();
  }
};

// Web Vitals 측정
export const measureWebVitals = () => {
  if (typeof window === "undefined") return;

  // LCP (Largest Contentful Paint) 측정
  const observer = new PerformanceObserver(list => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log("LCP:", lastEntry.startTime);
  });

  observer.observe({ entryTypes: ["largest-contentful-paint"] });

  // FID (First Input Delay) 측정
  const fidObserver = new PerformanceObserver(list => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      console.log("FID:", entry.processingStart - entry.startTime);
    });
  });

  fidObserver.observe({ entryTypes: ["first-input"] });

  // CLS (Cumulative Layout Shift) 측정
  const clsObserver = new PerformanceObserver(list => {
    let clsValue = 0;
    list.getEntries().forEach(entry => {
      if (!entry.hadRecentInput) {
        clsValue += (entry as any).value;
      }
    });
    console.log("CLS:", clsValue);
  });

  clsObserver.observe({ entryTypes: ["layout-shift"] });
};

// 메모리 사용량 모니터링
export const logMemoryUsage = () => {
  if (typeof window !== "undefined" && "memory" in performance) {
    const memory = (performance as any).memory;
    console.log("Memory Usage:", {
      used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`,
    });
  }
};

// 프레임 레이트 모니터링
export const measureFrameRate = (callback: (fps: number) => void) => {
  let lastTime = performance.now();
  let frameCount = 0;

  const measure = () => {
    frameCount++;
    const currentTime = performance.now();

    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      callback(fps);
      frameCount = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(measure);
  };

  requestAnimationFrame(measure);
};
