import { Html, useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useMemo, useState } from "react";
import { PopcornModel } from "./popcornModel";
import React from "react";

const POPCORNBOX_SCALE = 0.5;

interface PopcornInstance {
  ref: React.RefObject<THREE.Object3D>;
  initialPosition: THREE.Vector3;
  initialRotation: THREE.Euler;
}

interface PopcornBoxModelProps {
  visible: boolean;
}

export const PopcornBoxModel = ({ visible }: PopcornBoxModelProps) => {
  const { scene } = useGLTF("/models/theater/popcorn_box.glb");
  const popcornBoxRef = useRef<THREE.Object3D>(null);
  const { camera } = useThree();

  const [hovered, setHovered] = useState(false);
  const [isExploded, setIsExploded] = useState(false);

  // 팝콘 위치 및 ref
  const popcorns = useMemo(() => {
    const arr: PopcornInstance[] = [];
    const ROW = 4;
    const COL = 5;
    const HEIGHT = 2;

    const SPACING = 0.04;
    const RANDOMNESS = 0.01;
    const BASE_Y = 0.17;

    for (let y = 0; y < HEIGHT; y++) {
      for (let z = 0; z < COL; z++) {
        for (let x = 0; x < ROW; x++) {
          const offsetX = (Math.random() - 0.5) * RANDOMNESS * 2;
          const offsetY = (Math.random() - 0.5) * RANDOMNESS * 2;
          const offsetZ = (Math.random() - 0.5) * RANDOMNESS * 2;

          const initialPosition = new THREE.Vector3(
            (x - (ROW - 1) / 2) * SPACING + offsetX,
            BASE_Y + y * SPACING + offsetY,
            (z - (COL - 1) / 2) * SPACING + offsetZ
          );

          const initialRotation = new THREE.Euler(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          );

          arr.push({
            ref: React.createRef<THREE.Object3D>(),
            initialPosition,
            initialRotation,
          });
        }
      }
    }

    return arr;
  }, []);

  // velocity는 useRef로 관리 (재생성 방지)
  const velocities = useRef(popcorns.map(() => new THREE.Vector3()));

  // 초기 위치 설정 및 박스에 종속
  useEffect(() => {
    popcorns.forEach(({ ref, initialPosition, initialRotation }) => {
      if (ref.current) {
        ref.current.position.copy(initialPosition);
        ref.current.rotation.copy(initialRotation);

        popcornBoxRef.current?.add(ref.current);
      }
    });
  }, [popcorns]);

  useFrame(() => {
    if (!popcornBoxRef.current) return;

    // 오른쪽 하단 위치 (NDC 좌표)
    const ndc = new THREE.Vector3(0.5, -0.85, 0.5);
    ndc.unproject(camera);

    const camPos = new THREE.Vector3();
    camera.getWorldPosition(camPos);
    const direction = ndc.clone().sub(camPos).normalize();

    const distance = 0.7;
    const targetPos = camPos.clone().add(direction.multiplyScalar(distance));
    popcornBoxRef.current.position.copy(targetPos);

    if (isExploded) {
      let allBelowThreshold = true;

      popcorns.forEach(({ ref }, idx) => {
        if (!ref.current) return;

        const v = velocities.current[idx];
        ref.current.position.add(v);
        v.y -= 0.0015; // 중력 가속도

        if (ref.current.position.y > -1) {
          allBelowThreshold = false;
        }
      });

      // 모든 팝콘이 화면 아래로 내려가면 폭발 종료 및 초기화
      if (allBelowThreshold) {
        setIsExploded(false);
        popcorns.forEach(({ ref, initialPosition }, idx) => {
          const v = velocities.current[idx];
          v.set(0, 0, 0);
          if (ref.current) {
            ref.current.position.copy(initialPosition);
          }
        });
      }
    }
  });

  const handleClick = () => {
    if (isExploded) return;
    setIsExploded(true);

    // 팝콘 각각에 무작위 속도 부여
    velocities.current.forEach(v =>
      v.set(
        (Math.random() - 0.5) * 0.02,
        0.03 + Math.random() * 0.02,
        (Math.random() - 0.5) * 0.02
      )
    );
  };

  const handlePointerOver = () => {
    if (!visible) return;
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      visible={visible}
    >
      <primitive
        ref={popcornBoxRef}
        object={scene}
        scale={POPCORNBOX_SCALE}
        rotation={[0, 0.8, 0]}
      >
        {hovered && !isExploded && (
          <Html
            position={[0, 0.3, 0]}
            distanceFactor={0.8}
            rotation={[0, 0, 0]}
            center
            className="px-2 py-1 rounded-[12px] bg-white text-black font-bold shadow-md whitespace-nowrap"
          >
            Click box to pop! 🍿
          </Html>
        )}
      </primitive>

      {popcorns.map(({ ref }, idx) => (
        <PopcornModel key={idx} ref={ref} />
      ))}
    </group>
  );
};
