"use client";

import { Canvas, extend } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useRef, useContext, Suspense, useEffect } from "react";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { SequenceContext } from "./hooks/use-sequence";
import {
  Impossible,
  Challenge,
  Growth,
  Leejaeyeop,
} from "./components/geometries/textGeometries";

import { SequenceInfo } from "./hooks/use-sequence";
import DirectionalLight from "./components/lights/directionalLight";
import SpotLight from "./components/lights/spotLight";
import FixedCamera from "./components/camera/fixedCamera";
import { UseCollisionEnter } from "./hooks/use-collision-handler";
import { IntroButtonGroup } from "./components/geometries/button/IntroButtonGorup";

extend({ OrbitControls });

type SceneProps = {
  moveNextSequence: () => void;
};

const IntroScene = ({ moveNextSequence }: SceneProps) => {
  const {
    showImpossible,
    showChallenge,
    showGrowth,
    showCuboidCollider,
    showLeejaeyeop,
    changeLightPos,
  } = useContext<SequenceInfo>(SequenceContext);

  const rigidImpossible = useRef<RapierRigidBody>(null);
  const rigidChallenge = useRef<RapierRigidBody>(null);
  const rigidGrowth = useRef<RapierRigidBody>(null);
  const { collisionEnter } = UseCollisionEnter(moveNextSequence, {
    rigidImpossible,
    rigidChallenge,
    rigidGrowth,
  });

  const orbitRef = useRef(null);

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
        <DirectionalLight />
        <SpotLight />
        <Physics gravity={[0, -2, 0]}>
          {showImpossible && (
            <Suspense fallback={null}>
              <RigidBody
                name="rigidImpossible"
                ref={rigidImpossible}
                onCollisionEnter={collisionEnter}
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
                mass={1}
                restitution={0.8} // 높은 반발 계수
                angularDamping={0.0} // 감쇠 최소화
                linearDamping={0.0} // 감쇠 최소화
              >
                <Challenge rigidChallenge={rigidChallenge} />
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
            <CuboidCollider
              name="rigidCollider"
              position={[0, 0, 0]}
              args={[20, 0.5, 20]}
            />
          )}
        </Physics>
        {/* 버튼 그룹 */}
        <IntroButtonGroup moveNextSequence={moveNextSequence} />
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
      <OrbitControls
        ref={orbitRef}
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
      ></OrbitControls>
    </Canvas>
  );
};

export default IntroScene;
