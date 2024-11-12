"use client";

import { Canvas, extend } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import {
  Suspense,
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from "react";
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
import { useControls } from "leva";

import { PointLightHelper } from "three";
import { useHelper } from "@react-three/drei";
import { SequenceInfo } from "./hooks/use-sequence";
import { debounce, throttle } from "lodash";
extend({ OrbitControls });

type SceneProps = {
  moveNextSequence: () => void;
};

function DirectionalLight() {
  const directionalLightRef = useRef();

  useHelper(directionalLightRef, PointLightHelper, 1, "cyan");

  const config = useControls("DirecLights", {
    color: "#ffffff",
    intensity: { value: 5, min: 0, max: 10, step: 0.1 },
    position: { value: [0, 5, 10] },
  });
  return (
    <motion.directionalLight
      ref={directionalLightRef}
      variants={{
        on: {
          x: 0,
          y: 20,
          z: 200,
        },
      }}
      transition={{ duration: 1 }}
      {...config}
    />
  );
}

function SpotLight() {
  const spotLightRef = useRef();

  useHelper(spotLightRef, PointLightHelper, 1, "cyan");

  const config = useControls("SpotLights", {
    color: "#ffffff",
    intensity: { value: 300, min: 0, max: 5000, step: 0.1 },
    position: { value: [0, 20, 12] },
    angle: { value: 1, min: 0, max: 5, step: 0.1 },
  });
  return (
    <motion.spotLight
      ref={spotLightRef}
      variants={{
        on: {
          x: 0,
          y: 10,
          z: 35,
        },
      }}
      transition={{ duration: 1 }}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-bias={-0.00001}
      castShadow
      {...config}
    />
  );
}

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
    changeLightPos,
  } = useContext<SequenceInfo>(SequenceContext);

  const rigidImpossible = useRef<RapierRigidBody>(null);
  const rigidChallenge = useRef<RapierRigidBody>(null);
  const rigidGrowth = useRef<RapierRigidBody>(null);

  const orbitRef = useRef(null);

  const growthCollision = useCallback(
    debounce(() => {
      // off rotation & off transition
      rigidGrowth.current.setEnabledRotations(false, false, false, false);
      rigidGrowth.current.setEnabledTranslations(false, true, false, false);
      rigidGrowth.current.setGravityScale(30, true);

      rigidChallenge.current.applyImpulse({ x: 0, y: 2500, z: 2500 }, true);
      moveNextSequence();
    }, 100),
    []
  );

  const challengeCollision = useCallback(
    throttle(() => {
      // off rotation & off transition
      rigidChallenge.current.setEnabledRotations(false, false, false, true);
      rigidChallenge.current.setEnabledTranslations(false, true, false, true);

      rigidImpossible.current.applyImpulse({ x: 0, y: 2000, z: 2000 }, true);

      // 2번째 sequence 으로 이동
      moveNextSequence();
    }, 500),
    []
  );

  const jaeyeopCollision = useCallback(
    throttle(
      () => {
        moveNextSequence();
      },
      1000,
      { leading: true, trailing: false }
    ),
    []
  );

  const collisionEnter = ({ manifold, target, other }) => {
    if (
      target.rigidBodyObject.name === "rigidImpossible" &&
      other.rigidBodyObject.name === "rigidChallenge"
    ) {
      challengeCollision();
    }
    if (
      target.rigidBodyObject.name === "rigidChallenge" &&
      other.rigidBodyObject.name === "rigidGrowth"
    ) {
      growthCollision();
    }

    if (target.rigidBodyObject.name === "rigidLeejaeyeop") {
      jaeyeopCollision();
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
                friction={0.1} // 낮은 마찰 계수
                linearDamping={0.0} // 감쇠 최소화
                angularDamping={0.0} // 감쇠 최소화
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
      <OrbitControls
        ref={orbitRef}
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
      ></OrbitControls>
    </Canvas>
  );
};

export { Scene };
