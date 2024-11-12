"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef } from "react";
import { Courgette } from "next/font/google";

const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});

const DraggableImage = ({
  src,
  idx,
  isVisible,
  lastIdx,
  setCursection,
}: {
  src: string;
  idx: number;
  isVisible: boolean;
  lastIdx: number;
  setCursection: Dispatch<SetStateAction<number>>;
}) => {
  const constraintsRef = useRef(null);
  const rotateDegree = () => {
    return [24, 12, 3, 6][idx];
  };
  const threshold = 100;

  const handleDragEnd = (_, info) => {
    if (idx === lastIdx) return;
    // 드래그 거리를 계산하여 상태에 업데이트
    const dragDistance = Math.sqrt(
      Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2)
    );
    if (dragDistance >= threshold) {
      setCursection(idx + 1);
    }
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={constraintsRef}
          className="w-[300px] h-[300px] absolute cursor-grabbing"
          style={{
            transform: `rotate(${rotateDegree()}deg)`,
            zIndex: `${-1 * idx}`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full h-full rounded-lg "
            drag
            dragConstraints={constraintsRef} // Constrain drag area
            dragElastic={0.2} // Add some elasticity for a smoother feel
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }} // Change cursor on drag
            style={{
              backgroundImage: `url('/${src}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DraggableContainer = ({
  srcs,
  setCursection,
  curSection,
}: {
  srcs: string[];
  curSection: number;
  setCursection: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="sticky top-0 w-[300px] h-screen flex items-center">
      <div
        className={
          courgette.className +
          " text-white absolute top-[150px] no-wrap whitespace-nowrap text-3xl"
        }
      >
        (Drag Image or Scroll!)
      </div>
      {srcs.map((src, idx) => (
        <DraggableImage
          key={src}
          src={src}
          idx={idx}
          lastIdx={srcs.length - 1}
          isVisible={curSection <= idx}
          setCursection={setCursection}
        />
      ))}
    </div>
  );
};

export default DraggableContainer;
