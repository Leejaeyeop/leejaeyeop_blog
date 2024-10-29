"use client";

import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import { motion, MotionCanvas } from "framer-motion-3d";
import {
  useGLTF,
  useTexture,
  Shadow,
  meshBounds,
  Html,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontData, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import myFont from "./Roboto_Bold.json";
import { OrbitControls } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { useThree } from "@react-three/fiber";

const lightVariants = {
  on: { color: "#888" },
  off: { color: "#000" },
};

extend({ TextGeometry, OrbitControls });

// Add types to ThreeElements elements so primitives pick up on it

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
      <motion.mesh receiveShadow castShadow>
        {/* <motion.primitive
        variants={lightVariants}
        roughness={0.5}
        metalness={0.8}
        object={materials.track}
        attach="material"
        transition={{ ...transition, damping: 100 }}
      /> */}
      </motion.mesh>
      <motion.group
        position={[-6.5, -0.5, 2.1]}
        variants={
          {
            // on: { z: -1.2 },
            // off: { z: 1.2 },
          }
        }
      >
        <motion.mesh receiveShadow castShadow>
          <textGeometry
            args={["Impossible", { font: font, size: 2, height: 1 }]}
          ></textGeometry>

          <motion.meshStandardMaterial roughness={0.5} />
          {/* color 설정... */}
          {/* <motion.meshBasicMaterial color="rgb(255, 150, 150)" /> */}
        </motion.mesh>
        <motion.pointLight
          intensity={100}
          distance={40}
          variants={lightVariants}
          color={"#ff2400"}
        />
        {/* i 아래 그림자 */}
        {/* <Shadow
          renderOrder={-1000}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1, 2, 1]}
        /> */}
      </motion.group>
    </group>
  );
};

const Challenge = () => {
  return (
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      <motion.group
        position={[-6.5, 5, 1]}
        variants={
          {
            // on: { z: -1.2 },
            // off: { z: 1.2 },
          }
        }
        animate={{}}
      >
        <motion.mesh
          receiveShadow
          castShadow
          variants={{
            on: { rotateX: 0 },
            off: { rotateX: Math.PI * 1.3 },
          }}
        >
          {/* <sphereGeometry args={[0.8, 64, 64]} /> */}
          <textGeometry
            args={["Challenge", { font: font, size: 2, height: 1 }]}
          ></textGeometry>

          <motion.meshStandardMaterial roughness={0.5} />
        </motion.mesh>
        {/* 조명 */}
        <motion.pointLight
          intensity={100}
          distance={1.4}
          variants={lightVariants}
        />
        <Shadow
          renderOrder={-1000}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1, 1, 1]}
        />
      </motion.group>
    </group>
  );
};

const Scene = () => {
  const rigidImpossible = useRef<RapierRigidBody>(null);
  const rigidChallenge = useRef<RapierRigidBody>(null);

  const collisionEnter = (e) => {
    // rigidImpossible.current.applyImpulse({ x: 0, y: 0, z: 100 }, true);
    // rigidImpossible.current.addForce({ x: -5, y: 0, z: 100 }, true);
    // // A one-off torque rotation
    // rigidImpossible.current.applyTorqueImpulse(
    //   { x: 100, y: 100, z: 100 },
    //   true
    // );
    // rigidImpossible.current.addTorque({ x: 0, y: 0, z: 100 }, true);
    // off rotation
    // rigidChallenge.current.setEnabledRotations(false, false, false, false);
  };
  return (
    <Canvas
      orthographic
      shadows
      dpr={[1, 2]}
      camera={{ zoom: 75, position: [5, 5, 5], fov: 50 }}
    >
      <motion.group>
        {/* 전체 조명 */}
        <ambientLight intensity={0.1} />
        {/*  */}
        {/* <directionalLight position={[10, 15, 20]} intensity={0.5} /> */}
        <motion.directionalLight
          position={[-10, -15, -16]}
          intensity={0.5}
          variants={colorVariants}
        />
        {/* <motion.pointLight
          position={[0, 0, 5]}
          distance={5}
          intensity={5}
          variants={colorVariants}
        /> */}
        <motion.spotLight
          variants={colorVariants}
          position={[10, 15, 16]}
          angle={0.4}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00001}
          castShadow
          color={"#ff2400"}
        />
        <Physics gravity={[0, -2, 0]}>
          <Suspense fallback={null}>
            <RigidBody ref={rigidImpossible} onCollisionEnter={collisionEnter}>
              <Impossible />
            </RigidBody>
          </Suspense>
          {/* <Suspense fallback={null}>
            <RigidBody ref={rigidChallenge}>
              <Challenge />
            </RigidBody>
          </Suspense> */}
          {/* 땅바닥 */}
          <CuboidCollider position={[0, 0, 0]} args={[20, 0.5, 20]} />
        </Physics>

        <mesh
          receiveShadow
          renderOrder={1000}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[20, 20]} />
          <motion.shadowMaterial
            transparent
            opacity={0.1}
            variants={{
              on: { opacity: 0.1 },
              off: { opacity: 0.3 },
            }}
          />
        </mesh>
      </motion.group>
      <OrbitControls></OrbitControls>
    </Canvas>
  );
};

const colorVariants = {
  on: { color: "#7fffd4" },
  off: { color: "#c72f46" },
};

export { Scene };
