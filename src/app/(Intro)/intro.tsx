"use client";

import { Scene } from "./Canvas";
import { Suspense, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";

import { transition } from "./transition";
import { useAnimatedText } from "./hooks/use-animated-text";
import { SequenceContext, useSequence } from "./hooks/use-sequence";

const Intro = () => {
  const { sequence, moveNextSequence } = useSequence();
  const {
    text,
    backgroundColor,
    color,
    shakeX,
    shakeY,
    delayTime,
    h1Animation,
    showH2Text,
  } = sequence;
  const headerRef = useAnimatedText(text, transition);
  const [sizes, setSizes] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    setSizes({
      width: window?.innerWidth,
      height: window?.innerHeight,
    });
    const resizeHandler = () => {
      setSizes({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    if (delayTime > 0) {
      setTimeout(() => moveNextSequence(), delayTime);
    }

    return;
  }, [delayTime]);
  return (
    <SequenceContext.Provider value={sequence}>
      <MotionConfig transition={transition}>
        <motion.div
          style={{ width: "100%", height: "100%" }}
          // style={{ width: sizes.width, height: sizes.height }}
          className="absolute"
          initial={false}
          animate={{
            backgroundColor,
            color,
            x: shakeX ? [0, -5, 5, -5, 5, 0, 0, -5, 5, -5, 5, 0] : [], // X축으로 진동
            y: shakeY ? [0, -5, 5, -5, 5, 0] : [], // y축으로 진동
          }}
        >
          <motion.div
            className="intro-text-container"
            animate={h1Animation}
            transition={{
              duration: 0.3, // 애니메이션 속도를 2초로 설정
              ease: "easeInOut", // 부드러운 시작과 끝을 위한 easing 설정
            }}
          >
            <motion.h1 ref={headerRef} />
            {showH2Text && (
              <motion.h2
                initial={{ x: "100%" }} // 오른쪽에서 시작
                animate={{ x: "0%" }} // 원래 자리로 이동
                transition={{ type: "spring", stiffness: 70, damping: 10 }} // 부드러운 스프링 애니메이션
                onAnimationComplete={() => moveNextSequence()}
              >
                에 목마른
              </motion.h2>
            )}
          </motion.div>

          <Scene moveNextSequence={moveNextSequence} />
        </motion.div>
      </MotionConfig>
    </SequenceContext.Provider>
  );
};

export default Intro;
