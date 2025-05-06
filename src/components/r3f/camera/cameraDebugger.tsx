import { useFrame, useThree } from "@react-three/fiber";

export const CameraDebugger = () => {
  const { camera } = useThree();

  useFrame(() => {
    console.log("Camera Position:", camera.position);
    console.log("Camera Rotation:", camera.rotation);
  });

  return null;
};
