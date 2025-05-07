import { useTheaterStore } from "@/store/useTheaterStore";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { PerspectiveCamera as PerspectiveCameraType } from "three";

const DEFAULT_FOV = 43;
const REFERENCE_ASPECT_RATIO = 1.5;
export const ResizeCamera = () => {
  const { camera, size } = useThree();

  const [isScreenZoom] = useTheaterStore(
    useShallow(state => [state.isScreenZoom])
  );

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCameraType;
    const currentAspectRatio = size.width / size.height;
    // 비율이 꺠진다 -> 시야각 변경
    if (currentAspectRatio < REFERENCE_ASPECT_RATIO) {
      const aspectRatioDifference = REFERENCE_ASPECT_RATIO - currentAspectRatio;

      if (aspectRatioDifference < 0.5) {
        // 더 적은 시야각 제공
        perspectiveCamera.fov = DEFAULT_FOV + aspectRatioDifference * 40;
      } else if (aspectRatioDifference < 1) {
        // 더 넓은 시야각 제공
        perspectiveCamera.fov = DEFAULT_FOV + aspectRatioDifference * 53;
      } else {
        perspectiveCamera.fov = DEFAULT_FOV + aspectRatioDifference * 60;
      }
    } else {
      perspectiveCamera.fov = DEFAULT_FOV;
    }

    perspectiveCamera.updateProjectionMatrix();
  }, [size, camera, isScreenZoom]);

  return null;
};
