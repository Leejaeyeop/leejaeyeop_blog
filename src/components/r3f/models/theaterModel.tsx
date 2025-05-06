import { HtmlContentPage } from "@/app/(html)/html";
import { useTheaterStore } from "@/store/useTheaterStore";
import { Html, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useRef } from "react";
import { useShallow } from "zustand/shallow";
import * as THREE from "three";

// Constants
const SCREEN_GROUP_POSITION: [number, number, number] = [-0.01, 3.1, -3.8];
const HTML_SCALE = 0.11;
const FILTER_PLANE_POSITION: [number, number, number] = [0, 0, 0.01];
const FILTER_PLANE_SIZE: [number, number] = [4.4, 2.76];
const FILTER_INITIAL_OPACITY = 0.02;
const FADE_IN_DURATION = 4;

const meshBasicMaterialVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: FILTER_INITIAL_OPACITY,
    transition: { duration: FADE_IN_DURATION },
  },
};

export const TheaterModel = () => {
  const { scene } = useGLTF("/models/theater/theater.glb");

  const [showScreen] = useTheaterStore(useShallow(state => [state.showScreen]));

  const sceneRef = useRef<THREE.Object3D>(null);
  const filterRef = useRef<THREE.Mesh>(null);

  return (
    <primitive object={scene} scale={1} position={[0, 0, 0]} ref={sceneRef}>
      {showScreen && (
        <group position={SCREEN_GROUP_POSITION}>
          <Html position={[0, 0, 0]} center transform scale={HTML_SCALE}>
            <HtmlContentPage />
          </Html>
          <mesh position={FILTER_PLANE_POSITION} ref={filterRef}>
            <planeGeometry args={FILTER_PLANE_SIZE} />
            <motion.meshBasicMaterial
              transparent
              opacity={FILTER_INITIAL_OPACITY}
              depthTest={false}
              initial="hidden"
              animate="visible"
              variants={meshBasicMaterialVariants}
            />
          </mesh>
        </group>
      )}
    </primitive>
  );
};
