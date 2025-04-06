"use client";
import { motion } from "framer-motion";
import { Title3D } from "@/features/scene/about/firstSection/components/canvas/title3d";

function FirstSection() {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0.6 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Title3D />
    </motion.div>
  );
}

export default FirstSection;
