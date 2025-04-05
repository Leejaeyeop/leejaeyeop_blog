import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

const FixedCamera = () => {
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
};

export default FixedCamera;
