"use client";
import { useEffect, useRef } from "react";
import "./style.css";
import { Playfair } from "next/font/google";

const playfair = Playfair({
  weight: ["800"],
  style: ["italic"],
  display: "swap",
  subsets: ["latin"],
});

const NUM_INITIAL_DOTS = 30;

const RandomDots = ({ parentRef }) => {
  useEffect(() => {
    let isCancelled = false;

    const createDot = () => {
      if (isCancelled) return;

      const parent = parentRef.current;
      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;

      const dot = document.createElement("div");
      dot.className = "random-dot";
      // 위치 & 크기
      const x = Math.random() * (parentWidth - 10); // 10px은 dot 크기를 고려하여 여유 공간 추가
      const y = Math.random() * (parentHeight - 10);
      const size = Math.random() * 20 + 2; // 2~8px

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      parent.appendChild(dot);

      // lifespan
      const life = Math.random() * 1000 + 300; // 500ms ~ 1500ms
      setTimeout(() => {
        dot.remove();
      }, life);
    };

    // 초기 dot 여러 개
    for (let i = 0; i < NUM_INITIAL_DOTS; i++) {
      createDot();
    }

    // 랜덤한 간격으로 dot 추가 생성
    const loop = () => {
      if (isCancelled) return;
      createDot();

      const delay = Math.random() * 200; // 100~400ms
      setTimeout(loop, delay);
    };

    loop();

    return () => {
      isCancelled = true;
    };
  }, [parentRef]);

  return null;
};

function FirstSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <section
      ref={ref}
      className={
        playfair.className +
        " w-full h-[1000px] min-h-screen flex flex-col items-end relative px-60 justify-center"
      }
    >
      {/* <RandomDots parentRef={ref} /> */}
      <h1 className="text-[11rem]">Lee jaeyeop</h1>
      <h2 className="text-7xl">Frontend developer</h2>
      <Aside />
    </section>
  );
}

const Aside = () => {
  return (
    <aside className="text-2xl flex flex-col gap-10 relative items-end w-100 break-words mt-5">
      <div className="w-full text-right">
        <h3 className="opacity-70">Impossible is nothing</h3>
      </div>
      <div className="w-full text-right">
        <h3 className="opacity-90">Growth</h3>
        <p>
          I am the most thirsty <br />
          for growth than anyone else
        </p>
      </div>
      <div className="w-full text-right">
        <h3 className="opacity-90">Challenge</h3>
        <p>
          They are not afraid of challenges <br />
          but rather enjoy them.
        </p>
      </div>
      <div className="w-full text-right">
        <h3 className="opacity-90">Passion</h3>
        <p>I&apos;m always on fire with hot passion.</p>
      </div>
    </aside>
  );
};

export default FirstSection;
