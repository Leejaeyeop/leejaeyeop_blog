"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
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

  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={constraintsRef}
            className="w-[300px] h-[300px] absolute cursor-pointer"
            style={{
              transform: `rotate(${rotateDegree()}deg)`,
              zIndex: `${-1 * idx}`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsZoomed(true);
            }}
          >
            <motion.div
              className="w-full h-full rounded-lg "
              drag
              dragConstraints={constraintsRef} // Constrain drag area
              dragElastic={0.2} // Add some elasticity for a smoother feel
              onDragEnd={() => setIsZoomed(true)}
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

      {/* Zoomed Image Overlay */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            onWheel={e => e.stopPropagation()}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh] w-[600px] h-[600px] rounded-lg overflow-hidden"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={e => e.stopPropagation()}
              style={{
                backgroundImage: `url('/${src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <button
                className="absolute top-4 right-4 bg-black bg-opacity-20 hover:bg-opacity-30 text-black rounded-full w-8 h-8 flex items-center justify-center transition-all"
                onClick={() => setIsZoomed(false)}
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
    <div className="sticky top-0 hidden sm:w-[300px] h-screen lg:flex items-center">
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
