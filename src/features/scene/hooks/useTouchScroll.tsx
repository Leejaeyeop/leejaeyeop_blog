import { MutableRefObject, useRef } from "react";

export default function useTouchScroll({
  containerRef,
}: {
  containerRef: MutableRefObject<HTMLDivElement>;
}) {
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);
  const velocityRef = useRef(0);
  const animationRef = useRef(null);
  const isTouchInsideRef = useRef(false); // ✅ 터치가 내부에서 발생했는지 여부 체크
  const SCROLL_MULTIPLIER = 1.2; // 🔍 스크롤 이동 감도
  const FRICTION = 0.85; // 🔍 감속 정도
  const MIN_VELOCITY = 0.05; // 🔍 최소 속도

  const onTouchStart = e => {
    if (!containerRef.current) return;

    // ✅ 터치가 containerRef 내부에서 발생했는지 확인
    if (containerRef.current.contains(e.target)) {
      isTouchInsideRef.current = true;

      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      startYRef.current = e.touches[0].clientY;
      startScrollTopRef.current = containerRef.current.scrollTop;
      velocityRef.current = 0;
    } else {
      isTouchInsideRef.current = false; // ✅ 외부 터치 시 무시
    }
  };

  const onTouchMove = e => {
    if (!containerRef.current || !isTouchInsideRef.current) return;

    const currentY = e.touches[0].clientY;
    const deltaY = (startYRef.current - currentY) * SCROLL_MULTIPLIER;
    const newScrollTop = startScrollTopRef.current + deltaY;

    velocityRef.current = startYRef.current - currentY;
    containerRef.current.scrollTop = newScrollTop;
  };

  const applyInertia = () => {
    if (!containerRef.current) return;

    velocityRef.current *= FRICTION;

    if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
      containerRef.current.scrollTop += velocityRef.current;
      animationRef.current = requestAnimationFrame(applyInertia);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const onTouchEnd = () => {
    if (!isTouchInsideRef.current) return;
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(applyInertia);
  };

  return { onTouchMove, onTouchStart, onTouchEnd };
}
