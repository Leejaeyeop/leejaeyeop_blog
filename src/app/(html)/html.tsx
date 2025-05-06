import HeaderComponent from "@/components/organism/header/Header";
import { useTheaterStore } from "@/store/useTheaterStore";
import { useRef } from "react";
import { useShallow } from "zustand/shallow";
import AboutSection from "./(aboutSection)/section";
import ExperienceSection from "./(experienceSection)/section";
import FirstSection from "./(firstSection)/section";
import Footer from "@/components/molecules/footer/Footer";
import Wave from "@/components/atom/Wave";

export const HtmlContentPage = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop += e.deltaY;

    // 가짜 onScroll 이벤트 트리거
    const scrollEvent = new Event("scroll", { bubbles: true });
    containerRef.current.dispatchEvent(scrollEvent);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-y-scroll overflow-x-hidden animate-fadeIn"
      style={{
        width: "1600px",
        height: "1000px",
      }}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onWheel={handleWheel}
    >
      <header id="header" className="mb-10">
        <HeaderComponent />
      </header>
      <main className="px-20">
        <FirstSection />
        <AboutSection />
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
};
