import { useMemo } from "react";
import { ExtrudeGeometry, Shape } from "three";

const useProgressGeometry = () => {
  return useMemo(() => {
    const shape = new Shape();

    shape.moveTo(-0.15, -0.1); // 왼쪽 아래
    shape.lineTo(0.08, 0); // 오른쪽 꼭짓점
    shape.lineTo(-0.15, 0.1); // 왼쪽 위
    shape.lineTo(-0.15, -0.1);

    const geometry = new ExtrudeGeometry(shape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
    });

    return geometry;
  }, []);
};
export const ProgressIcon = () => {
  const geometry = useProgressGeometry();
  return (
    <mesh
      geometry={geometry}
      position={[0.1, 0.05, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1.5}
      castShadow
    >
      <meshStandardMaterial color="white" />
    </mesh>
  );
};
