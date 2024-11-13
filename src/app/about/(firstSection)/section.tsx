"use client";
import Scene from "./Canvas";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
function Title3D() {
  return (
    <div className="h-[150vh] w-screen">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

function FirstSection() {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0.5 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Title3D />
    </motion.div>
  );
}

export default FirstSection;
