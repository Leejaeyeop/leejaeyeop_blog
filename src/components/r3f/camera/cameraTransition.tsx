import { useTheaterStore } from "@/store/useTheaterStore";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

export const CameraTransition = () => {
  const { camera } = useThree();

  const [
    cameraPosition,
    setIsCameraTransitioning,
    setShowScreen,
    cameraTarget,
    cameraTranstionSpeed,
    setCameraTranstionSpeed,
  ] = useTheaterStore(
    useShallow(state => [
      state.cameraPosition,
      state.setIsCameraTransitioning,
      state.setShowScreen,
      state.cameraTarget,
      state.cameraTranstionSpeed,
      state.setCameraTranstionSpeed,
    ])
  );

  useFrame(() => {
    // 🚶 위치를 선형 보간으로 이동
    camera.position.lerp(cameraPosition.targetPosition, cameraTranstionSpeed);

    // 🔄 회전을 구면 선형 보간으로 이동
    camera.quaternion.slerp(
      cameraPosition.targetQuaternion,
      cameraTranstionSpeed
    );

    const distance = camera.position.distanceTo(cameraPosition.targetPosition);
    const angleDiff = camera.quaternion.angleTo(
      cameraPosition.targetQuaternion
    );

    // 종료
    if (distance < 0.01 && angleDiff < 0.01) {
      setIsCameraTransitioning(false);
      if (cameraTarget !== "projector") {
        setShowScreen(true);
        setCameraTranstionSpeed(0.04);
      }
    }
  });

  return null;
};
