import { useMemo } from "react";
import { BoxGeometry } from "three";

const useCancelGeometries = () => {
  return useMemo(() => {
    const bar1 = new BoxGeometry(0.05, 0.25, 0.05);
    const bar2 = new BoxGeometry(0.05, 0.25, 0.05);

    // rotation은 R3F에서 mesh에 직접 적용
    return [bar1, bar2];
  }, []);
};

export const CancelIcon = () => {
  const [geom1, geom2] = useCancelGeometries();
  return (
    <group position={[0, 0.13, 0]} scale={1.5} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh geometry={geom1} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh geometry={geom2} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};
