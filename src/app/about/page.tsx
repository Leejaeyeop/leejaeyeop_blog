"use client";
import FirstSection from "./FirstSection";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ y: -900, opacity: 0 }} // 위에서 시작
      animate={{ y: 0, opacity: 1 }} // 아래로 이동하면서 나타남
      transition={{ duration: 2, ease: "easeOut" }} // 애니메이션 지속 시간과 속도
    >
      <FirstSection></FirstSection>
      {/* test */}
      <div className=" text-white">this is second content.</div>
    </motion.div>
  );
}
