import { HtmlContentPage } from "@/app/(html)/html";
import { useTheaterStore } from "@/store/useTheaterStore";
import { Html, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import * as THREE from "three";
import vertexShader from "@/shaders/theater.vert.glsl";
import fragmentShader from "@/shaders/theater.frag.glsl";
import { useTheaterScreenStore } from "@/store/useTheaterScreenStore";
import { useFrame } from "@react-three/fiber";

// Constants
const SCREEN_GROUP_POSITION: [number, number, number] = [-0.01, 3.1, -3.8];
const HTML_SCALE = 0.11;
const HTML_POSITION: [number, number, number] = [0, 0, 0];
const FILTER_PLANE_POSITION: [number, number, number] = [0, 0, 0.01];
const FILTER_PLANE_SIZE: [number, number] = [4.4, 2.76];
const FILTER_INITIAL_OPACITY = 0.02;
const FADE_IN_DURATION = 4;
const SCENE_TRANSITION_DURATION = 500;

const meshBasicMaterialVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: FILTER_INITIAL_OPACITY,
    transition: { duration: FADE_IN_DURATION },
  },
};

export const TheaterModel = () => {
  const { scene } = useGLTF("/models/theater/theater.glb");
  const { currentScreen } = useTheaterScreenStore();
  const [isScreenTransitioning, setIsScreenTransitioning] = useState(false);
  // currentScreen 변경 감지
  useEffect(() => {
    setIsScreenTransitioning(true);
    setTimeout(() => {
      setIsScreenTransitioning(false);
    }, SCENE_TRANSITION_DURATION);
  }, [currentScreen]);

  const [showScreen] = useTheaterStore(useShallow(state => [state.showScreen]));

  const sceneRef = useRef<THREE.Object3D>(null);
  const filterRef = useRef<THREE.Mesh>(null);

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });
  return (
    <primitive object={scene} scale={1} position={[0, 0, 0]} ref={sceneRef}>
      {showScreen && (
        <group position={SCREEN_GROUP_POSITION}>
          <Html position={HTML_POSITION} center transform scale={HTML_SCALE}>
            {!isScreenTransitioning && <HtmlContentPage />}
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
            {/* Noise Shader */}
            {isScreenTransitioning && (
              <shaderMaterial
                ref={materialRef}
                uniforms={{
                  time: { value: 0 },
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
              />
            )}
          </mesh>
        </group>
      )}
    </primitive>
  );
};
