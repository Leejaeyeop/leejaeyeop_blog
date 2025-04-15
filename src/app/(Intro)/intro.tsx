"use client";

import { Suspense, useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import { useRouter } from "next/navigation";
import { Leva } from "leva";

import { transition } from "../../features/scene/intro/constants/transition";
import { useAnimatedText } from "../../features/scene/intro/hooks/use-animated-text";
import {
  SequenceContext,
  useSequence,
} from "../../features/scene/intro/hooks/use-sequence";
import IntroScene from "../../features/scene/intro/introScene";
import { useWindowSize } from "../../features/scene/intro/hooks/use-windowsize";
import Pending from "@/features/scene/intro/components/pending";

const IntroTextFloor = ({
  h1Animation,
  headerRef,
  showH2Text,
  onH2Complete,
}) => (
  <motion.div
    className="intro-text-container"
    animate={h1Animation}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <motion.h1 className="font-extrabold text-[25vw]" ref={headerRef} />
    {showH2Text && (
      <motion.h2
        className="font-semibold mb-2 text-[#06cc8f] text-[10vw]"
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ type: "spring", stiffness: 70, damping: 10 }}
        onAnimationComplete={onH2Complete}
      >
        에 목마른
      </motion.h2>
    )}
  </motion.div>
);

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

  const router = useRouter();
  const headerRef = useAnimatedText(text, transition);

  useWindowSize();

  useEffect(() => {
    if (delayTime > 0) {
      const timer = setTimeout(() => moveNextSequence(), delayTime);
      return () => clearTimeout(timer);
    }
  }, [delayTime, moveNextSequence]);
  const shakeKeyframes = {
    x: shakeX ? [0, -10, 10, -5, 5, 0, -5, 10, -5, 5, 0, -10, 5, -5, 5] : [],
    y: shakeY ? [0, -10, 10, -5, 5, 0, -5, 10, -5, 5] : [],
  };

  return (
    <SequenceContext.Provider value={sequence}>
      <MotionConfig transition={transition}>
        <motion.div
          className={`absolute z-0 w-full h-full from-white via-transparent scrollbar-hide to-[${backgroundColor}] ${bgGradient}`}
          initial={false}
          animate={{
            backgroundColor,
            color,
            ...shakeKeyframes,
            opacity: isDone ? 0 : 1,
          }}
          transition={{ duration: isDone ? 2.5 : 0.5, ease: "easeInOut" }}
          onUpdate={latest => {
            if (latest.opacity === 0) {
              router.push("/about");
            }
          }}
        >
          <IntroTextFloor
            h1Animation={h1Animation}
            headerRef={headerRef}
            showH2Text={showH2Text}
            onH2Complete={moveNextSequence}
          />
          <Leva
            collapsed
            flat
            hidden
            theme={{
              sizes: { titleBarHeight: "28px" },
              fontSizes: { root: "10px" },
            }}
          />
          <Suspense fallback={<Pending />}>
            <IntroScene moveNextSequence={moveNextSequence} />
          </Suspense>
        </motion.div>
      </MotionConfig>
    </SequenceContext.Provider>
  );
};

export default Intro;
