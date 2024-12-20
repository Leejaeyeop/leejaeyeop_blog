"use client";

import { Scene } from "./Canvas";
import { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { useRouter } from "next/navigation";

import { transition } from "./transition";
import { useAnimatedText } from "./hooks/use-animated-text";
import { SequenceContext, useSequence } from "./hooks/use-sequence";
import { Leva } from "leva";
import Link from "next/link";

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
    isDone,
    bgGradient,
  } = sequence;
  const headerRef = useAnimatedText(text, transition);
  const router = useRouter();
  const [_, setSizes] = useState<{ width: number; height: number }>({
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
          className={
            "absolute w-full h-full from-white via-transparent scrollbar-hide" +
            " to-[" +
            backgroundColor +
            "] " +
            bgGradient
          }
          initial={false}
          animate={{
            backgroundColor,
            color,
            x: shakeX
              ? [0, -10, 10, -5, 5, 0, -5, 10, -5, 5, 0, -10, 5, -5, 5]
              : [], // X축으로 진동
            y: shakeY ? [0, -10, 10, -5, 5, 0, -5, 10, -5, 5] : [], // y축으로 진동
            opacity: isDone ? 0 : 1,
          }}
          transition={{
            duration: isDone ? 2.5 : 0.5,
            ease: "easeInOut",
          }}
          onUpdate={latest => {
            if (latest.opacity === 0) {
              router.push("/about");
            }
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
            <motion.h1 className="font-extrabold text-[25vw]" ref={headerRef} />
            {showH2Text && (
              <motion.h2
                className="font-semibold mb-2 text-black text-[10vw] "
                initial={{ x: "100%" }} // 오른쪽에서 시작
                animate={{ x: "0%" }} // 원래 자리로 이동
                transition={{ type: "spring", stiffness: 70, damping: 10 }} // 부드러운 스프링 애니메이션
                onAnimationComplete={() => moveNextSequence()}
              >
                에 목마른
              </motion.h2>
            )}
          </motion.div>
          <Leva
            collapsed={false}
            flat={true}
            hidden
            theme={{
              sizes: {
                titleBarHeight: "28px",
              },
              fontSizes: {
                root: "10px",
              },
            }}
          />
          <Scene moveNextSequence={moveNextSequence} />
        </motion.div>
        <motion.button
          className="absolute bottom-4 right-4 font-bold text-xl sm:text-4xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }} // 1 -> 0 -> 1로 불투명도 변경
          transition={{
            duration: 2, // 애니메이션 지속 시간
            repeat: Infinity, // 무한 반복
            repeatType: "loop", // 루프 형태 반복
          }}
        >
          <Link href={"/about"}>{"SKIP >>"}</Link>
        </motion.button>
      </MotionConfig>
    </SequenceContext.Provider>
  );
};

export default Intro;
