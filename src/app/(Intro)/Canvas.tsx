"use client";

import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import { motion, MotionCanvas } from "framer-motion-3d";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useContext,
} from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import { OrbitControls } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { SequenceContext } from "./hooks/use-sequence";
import { Impossible, Challenge, Growth, Leejaeyeop } from "./textGeometries";
extend({ OrbitControls });

type SceneProps = {
  moveNextSequence: () => void;
};
const Scene = ({ moveNextSequence }: SceneProps) => {
  const { showImpossible, showChallenge, showGrowth, level } =
    useContext(SequenceContext);

  const rigidImpossible = useRef<RapierRigidBody>(null);
  const rigidChallenge = useRef<RapierRigidBody>(null);
  const rigidGrowth = useRef<RapierRigidBody>(null);
  const orbitRef = useRef(null);
  const collisionEnter = ({ manifold, target, other }) => {
    if (
      target.rigidBodyObject.name === "rigidImpossible" &&
      other.rigidBodyObject.name === "rigidChallenge"
    ) {
      rigidImpossible.current.applyImpulse({ x: 0, y: 2000, z: 2000 }, true);

      // off rotation & off transition
      rigidChallenge.current.setEnabledRotations(false, false, false, false);
      rigidChallenge.current.setEnabledTranslations(false, true, false, false);

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
    <Canvas
      orthographic
      shadows
      dpr={[1, 2]}
      camera={{ zoom: 65, position: [5, 5, 5], fov: 80 }}
    >
      {/* <motion.group animate={sequence}> */}
      <motion.group>
        {/* 전체 조명 */}
        <ambientLight intensity={0.1} />
        {/*  */}
        <motion.directionalLight position={[-10, -15, 5]} intensity={1} />
        <motion.pointLight position={[0, 0, 5]} distance={5} intensity={5} />
        <motion.spotLight
          position={[10, 25, 15]}
          angle={0.3}
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
                gravityScale={20}
                onCollisionEnter={collisionEnter}
                onCollisionExit={collisionExit}
              >
                <Challenge />
              </RigidBody>
            </Suspense>
          )}
          {showGrowth && (
            <Suspense fallback={null}>
              <RigidBody name="rigidGrowth" ref={rigidGrowth} gravityScale={30}>
                <Growth />
              </RigidBody>
            </Suspense>
          )}

          {/* 땅바닥 */}
          <CuboidCollider position={[0, 0, 0]} args={[20, 0.5, 20]} />
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
      <OrbitControls
        ref={orbitRef}
        onChange={() => {
          const cameraPosition = orbitRef.current.object.position;
          console.log("Camera position:", cameraPosition);
        }}
      ></OrbitControls>
    </Canvas>
  );
};

export { Scene };
