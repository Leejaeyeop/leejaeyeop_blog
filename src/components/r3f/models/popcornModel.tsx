import { useGLTF } from "@react-three/drei";
import { forwardRef, useMemo } from "react";
import * as THREE from "three";

// Constants
const POPCORNBOX_SCALE = 0.017;
const POPCORNBOX_ROTATION: [number, number, number] = [0, 0.8, 0];

export const PopcornModel = forwardRef<THREE.Object3D, {}>((_, ref) => {
  const { scene } = useGLTF("/models/theater/popcorn.compressed.glb");

  // clone 된 scene을 매번 생성
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      scale={POPCORNBOX_SCALE}
      rotation={POPCORNBOX_ROTATION}
      castShadow={false}
    />
  );
});

PopcornModel.displayName = "popcorn";
