import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// Constants
const POPCORNBOX_SCALE = 0.01;
const POPCORNBOX_POSITION: [number, number, number] = [-0.1, 3.04, 3.3];
const POPCORNBOX_ROTATION: [number, number, number] = [0, 0.8, 0];
const POPCORNBOX_OFFSET = new THREE.Vector3(0.17, -0.18, -0.5); // 카메라 기준 위치 (앞쪽)

export const PopcornModel = () => {
  const { scene } = useGLTF("/models/theater/popcorn.glb");
  const popcornRef = useRef<THREE.Object3D>(null);

  return (
    <primitive
      ref={popcornRef}
      object={scene}
      scale={POPCORNBOX_SCALE}
      position={POPCORNBOX_POSITION}
      rotation={POPCORNBOX_ROTATION}
    />
  );
};
