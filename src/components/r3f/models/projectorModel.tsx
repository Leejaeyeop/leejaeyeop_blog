import { useTheaterStore } from "@/store/useTheaterStore";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
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
const SPOT_LIGHT_BLINK_TIME = 125;

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
    setHovered(true);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
    setHovered(false);
  };

  const lightRef = useRef<THREE.SpotLight>(null);

  useEffect(() => {
    if (!isProjectorOn || !lightRef.current) return;

    let flashCount = 0;

    // 200ms 간격으로 on-off 반복
    const interval = setInterval(() => {
      if (lightRef.current) {
        lightRef.current.intensity =
          lightRef.current.intensity > 10 ? 0 : SPOTLIGHT_SETTINGS.intensity;
        flashCount++;
      }
      if (flashCount >= 4) {
        clearInterval(interval);
        if (lightRef.current) {
          lightRef.current.intensity = SPOTLIGHT_SETTINGS.intensity;
        }
      }
    }, SPOT_LIGHT_BLINK_TIME);

    return () => clearInterval(interval);
  }, [isProjectorOn]);

  const [hovered, setHovered] = useState(false);
  // Hover 효과 적용
  useEffect(() => {
    scene.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        materials.forEach(mat => {
          const material = mat as THREE.MeshStandardMaterial;
          if (material.emissive) {
            material.emissive.set(
              hovered && !isProjectorOn ? "#ffffff" : "#000000"
            );
            material.emissiveIntensity = hovered && !isProjectorOn ? 0.3 : 0;

            // 투명도 및 부드러운 효과
            material.transparent = true;
            material.opacity = hovered && !isProjectorOn ? 0.4 : 1.0;
            material.needsUpdate = true;
          }
        });
      }
    });
  }, [hovered, scene, isProjectorOn]);

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
          ref={lightRef}
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
