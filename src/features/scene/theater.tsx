"use client";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useAnimations,
  useGLTF,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Suspense, useEffect, useMemo, useRef } from "react";
import {
  Box3,
  DirectionalLightHelper,
  Euler,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PointLightHelper,
  Quaternion,
  ShaderMaterial,
  SpotLight,
  SpotLightHelper,
  Vector3,
} from "three";
import AboutSection from "@/app/(html)/(aboutSection)/section";

import {
  EffectComposer,
  Noise,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useTheaterStore } from "@/store/useTheaterStore";
import { useShallow } from "zustand/shallow";
import { PerspectiveCamera as PerspectiveCameraType } from "three";
import { motion } from "framer-motion-3d";
import { HtmlContentPage } from "@/app/(html)/html";

function TheaterModel() {
  const { scene } = useGLTF("/models/theater/theater.glb");

  const [showScreen] = useTheaterStore(useShallow(state => [state.showScreen]));

  const sceneRef = useRef();
  const filterRef = useRef();

  const meshBasicMaterialVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.02, transition: { duration: 5 } },
  };

  return (
    <>
      <primitive object={scene} scale={1} position={[0, 0, 0]} ref={sceneRef}>
        {showScreen && (
          <group position={[-0.01, 3.1, -3.8]}>
            <Html position={[0, 0, 0]} center transform scale={0.11}>
              <HtmlContentPage />
            </Html>

            <mesh position={[0, 0, 0.01]} ref={filterRef}>
              <planeGeometry args={[4.4, 2.76]} />
              <motion.meshBasicMaterial
                transparent
                opacity={0.02}
                depthTest={false}
                initial="hidden"
                animate="visible"
                variants={meshBasicMaterialVariants}
              />
            </mesh>
          </group>
        )}
      </primitive>
    </>
  );
}

function Projector() {
  const { scene, animations } = useGLTF("/models/theater/projector.glb");
  const projectRef = useRef(null);
  const [isProjectorOn, setIsProjectorOn, setCameraTarget] = useTheaterStore(
    useShallow(state => [
      state.isProjectorOn,
      state.setIsProjectorOn,
      state.setCameraTarget,
    ])
  );
  const { actions, names } = useAnimations(animations, projectRef);

  const playProjectAnimation = () => {
    actions[names[0]]?.reset().play();
  };

  const onClickHandler = () => {
    if (isProjectorOn) return;
    setIsProjectorOn(true);
    playProjectAnimation();
    setTimeout(() => setCameraTarget("seat"), 2000);
  };

  const onPointerOverHandler = () => {
    document.body.style.cursor = "pointer";
  };

  const onPointerOutHandler = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <mesh
      onClick={onClickHandler}
      onPointerOver={onPointerOverHandler}
      onPointerOut={onPointerOutHandler}
    >
      <primitive
        ref={projectRef}
        object={scene}
        scale={0.4}
        position={[-0.25, 4, 7.5]}
        rotation={[0, 3, 0]}
      />
      {isProjectorOn && (
        <spotLight
          position={[0.6, 5, 7.5]} // projector보다 약간 위
          angle={1}
          penumbra={0.5}
          intensity={60}
          distance={3}
          castShadow
        />
      )}

      <pointLight position={[0, 5, 8]} intensity={5} />
    </mesh>
  );
}

function CinemaLights() {
  const directionalLightRef = useRef(null);
  const pointLightRef = useRef(null);
  // const ambient = useControls("Ambient Light", {
  //   intensity: { value: 0.0, min: 0, max: 2 },
  //   color: "#ffffff",
  // });

  // const directional = useControls("Directional Light", {
  //   intensity: { value: 0.125, min: 0, max: 5 },
  //   position: { value: [0, 5, 5] },
  //   color: "#ffffff",
  // });

  // const point = useControls("Point Light", {
  //   intensity: { value: 1, min: 0, max: 5 },
  //   position: { value: [-0.5, 2, 3] },
  //   angle: { value: 0, min: 0, max: Math.PI / 2 },
  //   penumbra: { value: 1, min: 0, max: 1 },
  //   color: "#ffffff",
  // });

  // const rect = useControls("Rect Light", {
  //   intensity: { value: 3.5, min: 0, max: 15 },
  //   width: { value: 4 },
  //   height: { value: 3 },
  //   position: { value: [0, 3, -4] },
  //   rotation: { value: [0, 0, 0] },
  //   color: "#ffffff",
  // });
  // useHelper(directionalLightRef, DirectionalLightHelper);
  // useHelper(spotLightRef, SpotLightHelper);
  // useHelper(pointLightRef, PointLightHelper);
  // useHelper(rectAreaLightRef, RectAreaLightHelper);
  return (
    <>
      {/* <ambientLight intensity={ambient.intensity} color={ambient.color} />
      <directionalLight
        ref={directionalLightRef}
        intensity={directional.intensity}
        position={directional.position}
        color={directional.color}
        castShadow
      />
      <pointLight
        ref={pointLightRef}
        intensity={point.intensity}
        position={point.position}
        color={point.color}
        castShadow
      />
      <rectAreaLight
        intensity={rect.intensity}
        width={rect.width}
        height={rect.height}
        position={rect.position}
        rotation={[0, -3.1, 0]}
        color="white"
        castShadow
      /> */}
      <ambientLight intensity={0.0} color="#ffffff" />
      <directionalLight
        ref={directionalLightRef}
        intensity={0.125}
        position={[0, 5, 5]}
        color="#ffffff"
        castShadow
      />
      <pointLight
        ref={pointLightRef}
        intensity={1}
        position={[-0.5, 2, 3]}
        color="#ffffff"
        castShadow
      />
      <rectAreaLight
        intensity={3.5}
        width={4}
        height={3}
        position={[0, 3, -4]}
        rotation={[0, -3.1, 0]}
        color="#ffffff"
        castShadow
      />
    </>
  );
}

function CameraDebugger() {
  const { camera } = useThree();

  useFrame(() => {
    console.log("Camera Position:", camera.position);
    console.log("Camera Rotation:", camera.rotation);
  });

  return null;
}

function Effect() {
  return (
    <EffectComposer>
      <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.7} />
      <Vignette offset={0.3} darkness={1} />
      <Scanline density={1.5} opacity={0.1} />
    </EffectComposer>
  );
}

const DustParticles = () => {
  const groupRef = useRef<Group>(null!);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        basePosition: new Vector3(
          (Math.random() - 0.5) * 4,
          Math.random() * 4,
          (Math.random() - 0.5) * 2
        ),
        speed: Math.random() * 0.5 + 0.5, // 부유 속도
        offset: Math.random() * 1000, // 개별 시간 오프셋
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const data = particles[i];
      const x =
        data.basePosition.x + Math.sin(t * data.speed + data.offset) * 0.05;
      const y =
        data.basePosition.y + Math.cos(t * data.speed + data.offset) * 0.05;
      const z = data.basePosition.z + Math.sin(t * 0.3 + data.offset) * 0.02;
      child.position.set(x, y, z);
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.basePosition.clone()}>
          <circleGeometry args={[0.003, 8]} />
          <meshBasicMaterial
            color="white"
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export function MouseControlledCamera() {
  const { camera } = useThree();
  const pitch = useRef(0);
  const yaw = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const initialEuler = useRef(new Euler());
  const sensitivity = Math.PI * 0.02; // 감도 조정 가능

  useEffect(() => {
    // const euler = new Euler(-0.55, 0.44, 0.32, "YXZ");
    const euler = new Euler().copy(camera.rotation);

    initialEuler.current.copy(euler);
    pitch.current = euler.x;
    yaw.current = euler.y;
    camera.rotation.copy(euler);
  }, [camera]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;

      mouse.current.x = normalizedX;
      mouse.current.y = normalizedY;

      const basePitch = initialEuler.current.x;
      const baseYaw = initialEuler.current.y;

      // 마우스가 정중앙일 경우 => offset 0 → initialEuler 유지됨
      const offsetYaw = -normalizedX * sensitivity;
      const offsetPitch = -normalizedY * sensitivity;

      const targetYaw = baseYaw + offsetYaw;
      const targetPitch = basePitch + offsetPitch;

      pitch.current = MathUtils.clamp(
        targetPitch,
        basePitch - 0.2,
        basePitch + 0.6
      );
      yaw.current = MathUtils.clamp(targetYaw, baseYaw - 0.4, baseYaw + 0.4);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [sensitivity]);

  useFrame(() => {
    const quaternion = new Quaternion();
    quaternion.setFromEuler(new Euler(pitch.current, yaw.current, 0, "YXZ"));
    camera.quaternion.slerp(quaternion, 0.1);
  });

  return null;
}

export function CameraTransition() {
  const { camera } = useThree();
  const [
    cameraPosition,
    setIsCameraTransitioning,
    setShowScreen,
    cameraTarget,
  ] = useTheaterStore(
    useShallow(state => [
      state.cameraPosition,
      state.setIsCameraTransitioning,
      state.setShowScreen,
      state.cameraTarget,
    ])
  );

  useFrame(() => {
    // 🚶 위치를 선형 보간으로 이동
    camera.position.lerp(cameraPosition.targetPosition, 0.04);

    // 🔄 회전을 구면 선형 보간으로 이동
    camera.quaternion.slerp(cameraPosition.targetQuaternion, 0.04);

    const distance = camera.position.distanceTo(cameraPosition.targetPosition);
    const angleDiff = camera.quaternion.angleTo(
      cameraPosition.targetQuaternion
    );
    // 종료
    if (distance < 0.01 && angleDiff < 0.01) {
      setIsCameraTransitioning(false);
      if (cameraTarget !== "projector") {
        setShowScreen(true);
      }
    }
  });

  return null;
}

const DEFAULT_FOV = 45;
export function Resize() {
  const { camera, size } = useThree();

  const [isScreenZoom] = useTheaterStore(
    useShallow(state => [state.isScreenZoom])
  );

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCameraType;

    // 화면 크기에 따라 fov 조정
    // screen 화면
    if (isScreenZoom) {
      const isMobile = size.width < 1440; // 모바일 화면 감지 (예시로 768px 이하)
      if (isMobile) {
        perspectiveCamera.fov = DEFAULT_FOV + (1440 - size.width) * 0.06; // 모바일에서 더 넓은 시야 제공
      } else {
        perspectiveCamera.fov = DEFAULT_FOV; // 일반 화면에서는 기본 fov
      }
    } else {
      const isMobile = size.width < 968; // 모바일 화면 감지 (예시로 768px 이하)
      // seat 화면
      if (isMobile) {
        perspectiveCamera.fov = DEFAULT_FOV + (968 - size.width) * 0.06; // 모바일에서 더 넓은 시야 제공
      } else {
        perspectiveCamera.fov = DEFAULT_FOV; // 일반 화면에서는 기본 fov
      }
    }

    perspectiveCamera.updateProjectionMatrix();
  }, [size, camera, isScreenZoom]);

  return null;
}

export default function TheaterCanvas() {
  const [isProjectorOn, isCameraTransitioning, isScreenHovering] =
    useTheaterStore(
      useShallow(state => [
        state.isProjectorOn,
        state.isCameraTransitioning,
        state.isScreenHovering,
      ])
    );
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas className="w-full h-full">
        <PerspectiveCamera
          makeDefault
          position={[0.68, 5.43, 8.85]}
          rotation={[-0.55, 0.44, 0.32]}
        />
        <Resize />
        {isProjectorOn && <CinemaLights />}
        <DustParticles />
        {/* 모델 로딩 */}
        <Suspense fallback={null}>
          <TheaterModel />
        </Suspense>
        <Suspense>
          <Projector />
        </Suspense>
        <Effect />
        {/* TODO screen hover시 disabled */}
        {!isScreenHovering && !isCameraTransitioning && (
          <MouseControlledCamera />
        )}
        {isCameraTransitioning && <CameraTransition />}

        {/* <OrbitControls /> */}
        {/* <CameraDebugger /> */}
      </Canvas>
      {/* <Leva
        theme={{
          sizes: { titleBarHeight: "28px" },
          fontSizes: { root: "10px" },
        }}
      /> */}
    </div>
  );
}
