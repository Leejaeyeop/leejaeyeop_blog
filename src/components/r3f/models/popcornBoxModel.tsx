import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PopcornModel } from "./popcornModel";

// Constants
const POPCORNBOX_SCALE = 0.5;
const POPCORNBOX_POSITION: [number, number, number] = [-0.1, 3.04, 3.3];
const POPCORNBOX_ROTATION: [number, number, number] = [0, 0.8, 0];
const POPCORNBOX_OFFSET = new THREE.Vector3(0.17, -0.18, -0.5); // 카메라 기준 위치 (앞쪽)

export const PopcornBoxModel = () => {
  const { scene } = useGLTF("/models/theater/popcorn_box.glb");
  const popcornBoxRef = useRef<THREE.Object3D>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (popcornBoxRef.current) {
      // 카메라 앞에 상대적으로 위치
      const cameraWorldPosition = new THREE.Vector3();
      const cameraWorldQuaternion = new THREE.Quaternion();

      camera.getWorldPosition(cameraWorldPosition);
      camera.getWorldQuaternion(cameraWorldQuaternion); // offset을 카메라의 회전에 맞춰 회전

      const offset = POPCORNBOX_OFFSET.clone().applyQuaternion(
        cameraWorldQuaternion
      ); // 최종 위치 계산

      popcornBoxRef.current.position.copy(
        cameraWorldPosition.clone().add(offset)
      ); // 카메라와 같은 회전 유지 (또는 원하는 방향 설정 가능)

      //   popcornBoxRef.current.quaternion.copy(cameraWorldQuaternion);
    }
  });

  return (
    <group>
      <primitive
        ref={popcornBoxRef}
        object={scene}
        scale={POPCORNBOX_SCALE}
        position={POPCORNBOX_POSITION}
        rotation={POPCORNBOX_ROTATION}
      />
      <PopcornModel />
    </group>
  );
};
