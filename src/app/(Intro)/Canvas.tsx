"use client";

import { Canvas, extend } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Suspense, useEffect, useRef, useContext, useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { SequenceContext } from "./hooks/use-sequence";
import { Impossible, Challenge, Growth, Leejaeyeop } from "./textGeometries";
import { SequenceInfo } from "./hooks/use-sequence";
extend({ OrbitControls });

type SceneProps = {
  moveNextSequence: () => void;
};

function FixedCamera() {
  const { camera } = useThree();

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    camera.zoom = size.width / 18; // 화면 너비에 비례한 줌 설정
    camera.updateProjectionMatrix(); // 카메라 매트릭스 업데이트
  }, [size.width, camera]);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}

const Scene = ({ moveNextSequence }: SceneProps) => {
  const {
    showImpossible,
    showChallenge,
    showGrowth,
    showCuboidCollider,
    showLeejaeyeop,
    level,
    changeLightPos,
  } = useContext<SequenceInfo>(SequenceContext);

  const rigidImpossible = useRef<RapierRigidBody>(null);
  const rigidChallenge = useRef<RapierRigidBody>(null);
  const rigidGrowth = useRef<RapierRigidBody>(null);

  const orbitRef = useRef(null);
  const collisionEnter = ({ manifold, target, other }) => {
    if (
      target.rigidBodyObject.name === "rigidImpossible" &&
      other.rigidBodyObject.name === "rigidChallenge" &&
      level === 3
    ) {
      rigidImpossible.current.applyImpulse({ x: 0, y: 2000, z: 2000 }, true);

      // off rotation & off transition
      rigidChallenge.current.setEnabledRotations(false, false, false, true);
      rigidChallenge.current.setEnabledTranslations(false, true, false, true);

      // 2번째 sequence 으로 이동
      moveNextSequence();
    }
    if (
      target.rigidBodyObject.name === "rigidChallenge" &&
      other.rigidBodyObject.name === "rigidGrowth" &&
      level === 5
    ) {
      rigidChallenge.current.applyImpulse({ x: 0, y: 2500, z: 2500 }, true);

      // off rotation & off transition
      rigidGrowth.current.setEnabledRotations(false, false, false, false);
      rigidGrowth.current.setEnabledTranslations(false, true, false, false);

      moveNextSequence();
    }

    if (target.rigidBodyObject.name === "rigidLeejaeyeop" && level === 9) {
      moveNextSequence();
    }
  };

  //
  const collisionExit = ({ target, other }) => {
    if (
      target.rigidBodyObject.name === "rigidImpossible" &&
      other.rigidBodyObject.name === "rigidChallenge"
    ) {
      // on rotation & on transition
      rigidChallenge.current.setEnabledRotations(true, true, true, true);
      rigidChallenge.current.setEnabledTranslations(true, true, true, true);
      rigidChallenge.current.applyImpulse({ x: 10, y: 10, z: 0 }, true);
    }
    if (
      target.rigidBodyObject.name === "rigidChallenge" &&
      other.rigidBodyObject.name === "rigidGrowth"
    ) {
      // on rotation & on transition
      // rigidGrowth.current.setEnabledRotations(true, true, true, true);
      // rigidGrowth.current.setEnabledTranslations(true, true, true, true);
    }
  };

  return (
    <Canvas orthographic shadows dpr={[1, 2]}>
      <OrthographicCamera
        makeDefault
        position={[5, 5, 5]}
        near={-10}
        far={100}
      />
      <FixedCamera />
      {/* <motion.group animate={sequence}> */}
      <motion.group animate={changeLightPos ? "on" : "off"}>
        {/* 전체 조명 */}
        <ambientLight intensity={0.1} />
        {/*  */}
        <motion.directionalLight
          position={[20, -15, 5]}
          variants={{
            on: {
              x: 0,
              y: -15,
              z: 18,
            },
          }}
          transition={{ duration: 1 }}
          intensity={1}
        />
        <motion.pointLight
          distance={5}
          intensity={4}
          transition={{ duration: 1 }}
          position={[-0.5, 0, 5]}
          variants={{
            on: {
              x: -4,
              y: 0,
              z: 1,
            },
          }}
        />
        <motion.spotLight
          position={[10, 25, 12]}
          variants={{
            on: {
              x: 15,
              y: 25,
              z: 70,
            },
          }}
          transition={{ duration: 1 }}
          angle={1}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00001}
          castShadow
        />
        <Physics gravity={[0, -2, 0]}>
          {showImpossible && (
            <Suspense fallback={null}>
              <RigidBody
                name="rigidImpossible"
                ref={rigidImpossible}
                onCollisionEnter={collisionEnter}
                onCollisionExit={collisionExit}
              >
                <Impossible />
              </RigidBody>
            </Suspense>
          )}
          {showChallenge && (
            <Suspense fallback={null}>
              <RigidBody
                name="rigidChallenge"
                ref={rigidChallenge}
                gravityScale={30}
                onCollisionEnter={collisionEnter}
                onCollisionExit={collisionExit}
                mass={1}
              >
                <Challenge />
              </RigidBody>
            </Suspense>
          )}
          {showGrowth && (
            <Suspense fallback={null}>
              <RigidBody
                name="rigidGrowth"
                ref={rigidGrowth}
                gravityScale={30}
                mass={1}
              >
                <Growth />
              </RigidBody>
            </Suspense>
          )}
          {showLeejaeyeop && (
            <Suspense fallback={null}>
              <RigidBody
                name="rigidLeejaeyeop"
                gravityScale={100}
                onCollisionEnter={collisionEnter}
                restitution={0.8} // 높은 반발 계수
                friction={0.1} // 낮은 마찰 계수
                linearDamping={0.0} // 감쇠 최소화
                angularDamping={0.0} // 감쇠 최소화
                enabledRotations={[false, true, true]}
                mass={1}
              >
                <Leejaeyeop />
              </RigidBody>
            </Suspense>
          )}
          {/* 땅바닥 */}
          {showCuboidCollider && (
            <CuboidCollider position={[0, 0, 0]} args={[20, 0.5, 20]} />
          )}
        </Physics>
        {/* 그림자 바닥 */}
        <mesh
          receiveShadow
          renderOrder={1000}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[20, 20]} />
          <motion.shadowMaterial transparent opacity={0.15} />
        </mesh>
      </motion.group>
      <OrbitControls ref={orbitRef}></OrbitControls>
    </Canvas>
  );
};

export { Scene };
