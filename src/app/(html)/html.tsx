import dynamic from "next/dynamic";
import { useTheaterStore } from "@/store/useTheaterStore";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import useTouchScroll from "@/features/scene/hooks/useTouchScroll";
import { useTheaterScreenStore } from "@/store/useTheaterScreenStore";
import FirstSection from "./(firstSection)/section";
import { withScreenLoaded } from "@/hoc/withScreenLoaded";

const AboutSection = dynamic(() =>
  import("./(aboutSection)/section").then(mod => withScreenLoaded(mod.default))
);
const ExperienceSection = dynamic(() =>
  import("./(experienceSection)/section").then(mod =>
    withScreenLoaded(mod.default)
  )
);
const ContactArticle = dynamic(() =>
  import("./(contact)/articles").then(mod => withScreenLoaded(mod.default))
);
const Footer = dynamic(() =>
  import("@/components/molecules/footer/Footer").then(mod =>
    withScreenLoaded(mod.default)
  )
);

export const HtmlContentPage = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onTouchMove, onTouchStart, onTouchEnd } = useTouchScroll({
    containerRef,
  });
  const [currentScreen, isScreenTransitioning] = useTheaterScreenStore(
    useShallow(state => [state.currentScreen, state.isScreenTransitioning])
  );

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 0,
    });
  }, [currentScreen]);

  const [setCameraTarget, setIsScreenZoom, setIsScreenHovering] =
    useTheaterStore(
      useShallow(state => [
        state.setCameraTarget,
        state.setIsScreenZoom,
        state.setIsScreenHovering,
      ])
    );

  const onMouseEnterHandler = () => {
    setIsScreenHovering(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // 떠나면 취소
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      setCameraTarget("screen");
      setIsScreenZoom(true);
    }, 500); // 1초
  };

  const onMouseLeaveHandler = () => {
    setIsScreenHovering(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // 떠나면 취소
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      setCameraTarget("seat");
      setIsScreenZoom(false);
    }, 500); // 1초
  };

  const handleScroll = (deltaY: number) => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop += deltaY;

    // 가짜 onScroll 이벤트 트리거
    const scrollEvent = new Event("scroll", { bubbles: true });
    containerRef.current.dispatchEvent(scrollEvent);
  };

  const handleWheel = (e: React.WheelEvent) => {
    handleScroll(e.deltaY);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto overflow-x-hidden animate-fadeIn flex"
      style={{
        width: "1600px",
        height: "1000px",
        touchAction: "none",
        WebkitOverflowScrolling: "touch",
      }}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onWheel={handleWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <main
        className={`px-20 py-36 w-full ${
          isScreenTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentScreen === "main" && <FirstSection />}
        {currentScreen === "about" && <AboutSection />}
        {currentScreen === "experience" && <ExperienceSection />}
        {currentScreen === "contact" && <ContactArticle />}
      </main>
      {currentScreen !== "main" && <Footer />}
    </div>
  );
};
