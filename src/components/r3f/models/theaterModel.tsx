import { HtmlContentPage } from "@/app/(html)/html";
import { useTheaterStore } from "@/store/useTheaterStore";
import { Html, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useRef } from "react";
import { useShallow } from "zustand/shallow";
import * as THREE from "three";
import vertexShader from "@/shaders/theater.vert.glsl";
import fragmentShader from "@/shaders/theater.frag.glsl";
import filmEffectFragmentShader from "@/shaders/filmEffect.frag.glsl";
import { useTheaterScreenStore } from "@/store/useTheaterScreenStore";
import { useFrame } from "@react-three/fiber";
import {
  THEATER_CONSTANTS,
  meshBasicMaterialVariants,
} from "@/constants/theater";
import React from "react";

interface FilmEffectProps {
  FilmEffectMaterialRef: React.RefObject<THREE.ShaderMaterial>;
}

const FilmEffect = React.memo<FilmEffectProps>(({ FilmEffectMaterialRef }) => {
  return (
    <mesh position={THEATER_CONSTANTS.FILTER_PLANE_POSITION}>
      <planeGeometry args={THEATER_CONSTANTS.FILTER_PLANE_SIZE} />
      <shaderMaterial
        ref={FilmEffectMaterialRef}
        uniforms={{
          time: { value: 0 },
          scratchSpeed: { value: 0.5 },
          scratchThickness: { value: 0.002 },
          spotSize: { value: 0.008 },
          spotCount: { value: 10 },
          scratchCount: { value: 12 },
        }}
        vertexShader={vertexShader}
        fragmentShader={filmEffectFragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
});

FilmEffect.displayName = "FilmEffect";

interface NoiseShaderProps {
  isScreenTransitioning: boolean;
}

const NoiseShader = React.memo<NoiseShaderProps>(
  ({ isScreenTransitioning }) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(state => {
      if (materialRef.current) {
        materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      }
    });

    if (!isScreenTransitioning) return null;

    return (
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          time: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    );
  }
);

NoiseShader.displayName = "NoiseShader";

export const TheaterModel: React.FC = () => {
  const { scene } = useGLTF("/models/theater/theater.compressed.glb");
  const isScreenTransitioning = useTheaterScreenStore(
    state => state.isScreenTransitioning
  );
  const [showScreen] = useTheaterStore(useShallow(state => [state.showScreen]));
  const currentScreen = useTheaterScreenStore(state => state.currentScreen);
  const sceneRef = useRef<THREE.Object3D>(null);
  const FilmEffectMaterialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(state => {
    if (FilmEffectMaterialRef.current) {
      // 시간 업데이트는 매 프레임마다 필요
      FilmEffectMaterialRef.current.uniforms.time.value =
        state.clock.elapsedTime;

      // 화면별 설정은 변경될 때만 업데이트하도록 최적화
      const isMainScreen = currentScreen === "main";
      const material = FilmEffectMaterialRef.current;

      if (isMainScreen) {
        if (material.uniforms.scratchThickness.value !== 0.0015) {
          material.uniforms.scratchThickness.value = 0.0015;
        }
        if (material.uniforms.spotSize.value !== 0.006) {
          material.uniforms.spotSize.value = 0.006;
        }
        if (material.uniforms.scratchCount.value !== 12) {
          material.uniforms.scratchCount.value = 12;
        }
      } else {
        if (material.uniforms.scratchThickness.value !== 0.001) {
          material.uniforms.scratchThickness.value = 0.001;
        }
        if (material.uniforms.spotSize.value !== 0.004) {
          material.uniforms.spotSize.value = 0.004;
        }
        if (material.uniforms.scratchCount.value !== 10) {
          material.uniforms.scratchCount.value = 10;
        }
      }
    }
  });
  return (
    <primitive object={scene} scale={1} position={[0, 0, 0]} ref={sceneRef}>
      {showScreen && (
        <group position={THEATER_CONSTANTS.SCREEN_GROUP_POSITION}>
          <Html
            position={THEATER_CONSTANTS.HTML_POSITION}
            center
            transform
            scale={THEATER_CONSTANTS.HTML_SCALE}
          >
            <HtmlContentPage />
          </Html>
          <mesh position={THEATER_CONSTANTS.FILTER_PLANE_POSITION}>
            <planeGeometry args={THEATER_CONSTANTS.FILTER_PLANE_SIZE} />
            <motion.meshBasicMaterial
              transparent
              opacity={THEATER_CONSTANTS.FILTER_INITIAL_OPACITY}
              depthTest={false}
              initial="hidden"
              animate="visible"
              variants={meshBasicMaterialVariants}
            />
            <NoiseShader isScreenTransitioning={isScreenTransitioning} />
          </mesh>
          <FilmEffect FilmEffectMaterialRef={FilmEffectMaterialRef} />
        </group>
      )}
    </primitive>
  );
};
