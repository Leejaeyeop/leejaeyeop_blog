"use client";

import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import { motion, MotionCanvas } from "framer-motion-3d";
import { Dispatch, SetStateAction, Suspense, useEffect, useRef } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontData, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import myFont from "../Roboto_Bold.json";
import { OrbitControls } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { useThree } from "@react-three/fiber";

extend({ TextGeometry, OrbitControls });

type SceneProps = {
  sequence: string;
  setSequence: Dispatch<SetStateAction<string>>;
};
// @ts-ignore
const font = new FontLoader().parse(myFont);

const Impossible = () => {
  const state = useThree();
  useEffect(() => {
    const resizeHandler = () => {
      state.viewport.aspect = window.innerWidth / window.innerHeight;
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      <motion.mesh receiveShadow castShadow></motion.mesh>
      <motion.group position={[-6.5, -0.5, 1.5]}>
        <motion.mesh receiveShadow castShadow rotation={[0, 0, -0.1]}>
          <textGeometry
            args={["I", { font: font, size: 2.5, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#ff0000" />
        </motion.mesh>
        <motion.mesh
          receiveShadow
          castShadow
          rotation={[0, 0, -0.1]}
          position={[1.2, 0, 0]}
        >
          <textGeometry
            args={["mpossible", { font: font, size: 2, height: 1 }]}
          ></textGeometry>
          {/* 텍스트 색상 설정 */}
          <meshStandardMaterial roughness={0.5} color="#ff0000" />{" "}
        </motion.mesh>
      </motion.group>
    </group>
  );
};

const Challenge = () => {
  return (
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      <motion.group position={[-6.5, 10, 1.5]}>
        <motion.mesh receiveShadow castShadow>
          <textGeometry
            args={["C", { font: font, size: 3, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#0099FF" />
        </motion.mesh>
        <motion.mesh receiveShadow castShadow position={[2.7, 0, 0]}>
          <textGeometry
            args={["hallenge", { font: font, size: 2, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#0099FF" />
          {/* 텍스트 색상 설정 */}
        </motion.mesh>
      </motion.group>
    </group>
  );
};

const Scene = ({ sequence, setSequence }: SceneProps) => {
  const rigidImpossible = useRef<RapierRigidBody>(null);
  const rigidChallenge = useRef<RapierRigidBody>(null);
  const collisionEnter = ({ manifold, target, other }) => {
    if (
      target.rigidBodyObject.name === "rigidImpossible" &&
      other.rigidBodyObject.name === "rigidChallenge"
    ) {
      rigidImpossible.current.applyImpulse({ x: 0, y: 1500, z: 1500 }, true);

      // off rotation & off transition
      rigidChallenge.current.setEnabledRotations(false, false, false, false);
      rigidChallenge.current.setEnabledTranslations(false, true, false, false);

      // 2번째 sequence 으로 이동
      setSequence("2");
    }
  };

  return (
    <Canvas
      orthographic
      shadows
      dpr={[1, 2]}
      camera={{ zoom: 65, position: [5, 5, 5], fov: 50 }}
    >
      <motion.group animate={sequence}>
        {/* 전체 조명 */}
        <ambientLight intensity={0.1} />
        {/*  */}
        <motion.directionalLight
          position={[-10, -15, 5]}
          intensity={1}
          color={"#fffff"}
        />
        <motion.pointLight
          position={[0, 0, 5]}
          distance={5}
          intensity={5}
          variants={colorVariants}
        />
        <motion.spotLight
          position={[10, 25, 15]}
          angle={0.3}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00001}
          castShadow
          color={"#fffff"}
        />
        <Physics gravity={[0, -2, 0]}>
          <Suspense fallback={null}>
            <RigidBody
              name="rigidImpossible"
              ref={rigidImpossible}
              onCollisionEnter={collisionEnter}
            >
              <Impossible />
            </RigidBody>
          </Suspense>
          <Suspense fallback={null}>
            <RigidBody
              name="rigidChallenge"
              ref={rigidChallenge}
              gravityScale={10}
            >
              <Challenge />
            </RigidBody>
          </Suspense>
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
      <OrbitControls></OrbitControls>
    </Canvas>
  );
};

const colorVariants = {
  "1": { color: "#ff0000" },
  "2": { color: "#0099FF" },
};

export { Scene };
