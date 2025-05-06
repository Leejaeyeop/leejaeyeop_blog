import { useTheaterStore } from "@/store/useTheaterStore";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useShallow } from "zustand/shallow";
import * as THREE from "three";

// Constants
const PROJECTOR_SCALE = 0.4;
const PROJECTOR_POSITION: [number, number, number] = [-0.25, 4, 7.5];
const PROJECTOR_ROTATION: [number, number, number] = [0, 3, 0];

const SPOTLIGHT_POSITION: [number, number, number] = [0.6, 5, 7.5];
const SPOTLIGHT_SETTINGS = {
  angle: 1,
  penumbra: 0.5,
  intensity: 60,
  distance: 3,
};

const POINTLIGHT_POSITION: [number, number, number] = [0, 5, 8];
const POINTLIGHT_INTENSITY = 5;

const CAMERA_TARGET_DELAY = 2000;

export const ProjectorModel = () => {
  const { scene, animations } = useGLTF("/models/theater/projector.glb");
  const projectRef = useRef<THREE.Object3D>(null);

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

  const handleClick = () => {
    if (isProjectorOn) return;
    setIsProjectorOn(true);
    playProjectAnimation();
    setTimeout(() => setCameraTarget("seat"), CAMERA_TARGET_DELAY);
  };

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <mesh
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive
        ref={projectRef}
        object={scene}
        scale={PROJECTOR_SCALE}
        position={PROJECTOR_POSITION}
        rotation={PROJECTOR_ROTATION}
      />
      {isProjectorOn && (
        <spotLight
          position={SPOTLIGHT_POSITION}
          angle={SPOTLIGHT_SETTINGS.angle}
          penumbra={SPOTLIGHT_SETTINGS.penumbra}
          intensity={SPOTLIGHT_SETTINGS.intensity}
          distance={SPOTLIGHT_SETTINGS.distance}
          castShadow
        />
      )}
      <pointLight
        position={POINTLIGHT_POSITION}
        intensity={POINTLIGHT_INTENSITY}
      />
    </mesh>
  );
};
