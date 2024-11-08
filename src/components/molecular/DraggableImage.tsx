"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
const DraggableImage = (src?: string, alt?: string) => {
  const constraintsRef = useRef(null);
  return (
    <motion.div ref={constraintsRef} className="rotate-12 w-[300px] h-[300px]">
      <motion.div
        className="w-[300px] h-[300px] rounded-lg"
        drag
        dragConstraints={constraintsRef} // Constrain drag area
        dragElastic={0.2} // Add some elasticity for a smoother feel
        whileTap={{ cursor: "grabbing" }} // Change cursor on drag
        style={{
          backgroundImage: `url('/imqa.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></motion.div>
    </motion.div>
  );
};

export default DraggableImage;
