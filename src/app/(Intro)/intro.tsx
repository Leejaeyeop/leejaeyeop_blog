"use client";

import { Scene } from "./Canvas";
import { Suspense, useRef, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";

import { transition } from "./transition";
import { useAnimatedText } from "./hooks/use-animated-text";

const Intro = () => {
  const [sequence, setSequence] = useState("1");
  const headerRef = useAnimatedText(
    sequence === "1" ? "불가능" : "도전",
    transition
  );
  const [sizes, setSizes] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resizeHandler = () => {
      setSizes({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <MotionConfig transition={transition}>
      <motion.div
        style={{ width: sizes.width, height: sizes.height }}
        className="absolute"
        initial={false}
        animate={{
          backgroundColor: sequence === "1" ? "#FFA500" : "#ffffff",
          // color: step === "1" ? "#FF6D00" : "#7fffd4",
          color: sequence === "1" ? "#FF6D00" : "#005AFF",
          x: [0, -5, 5, -5, 5, 0], // X축으로 진동
          y: [0, -5, 5, -5, 5, 0], // y축으로 진동
        }}
      >
        <motion.h1 ref={headerRef} />
        <Scene sequence={sequence} setSequence={setSequence} />
      </motion.div>
    </MotionConfig>
  );
};

export default Intro;
