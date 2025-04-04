import { extend, Object3DNode, useFrame, useThree } from "@react-three/fiber";
import { FontData, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import myFont from "@/app/Roboto_Bold.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useEffect, useRef, useState } from "react";

extend({ TextGeometry });

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}
const font = new FontLoader().parse(myFont as unknown as FontData);

// ---------------------- Impossible ----------------------
const Impossible = () => {
  return (
    <group dispose={null} position={[-6.5, -0.5, 2.5]}>
      <mesh receiveShadow castShadow rotation={[0, 0, -0.1]}>
        <textGeometry
          args={["I", { font: font, size: 2.5, height: 1 }]}
        ></textGeometry>
        <meshStandardMaterial roughness={0.5} color="#ff0000" />
      </mesh>
      <mesh
        receiveShadow
        castShadow
        rotation={[0, 0, -0.1]}
        position={[1.2, 0, 0]}
      >
        <textGeometry
          args={["mpossible", { font: font, size: 2, height: 1 }]}
        ></textGeometry>
        {/* 텍스트 색상 설정 */}
        <meshStandardMaterial roughness={0.5} color="#ff0000" />{" "}
      </mesh>
    </group>
  );
};

// ---------------------- Challenge ----------------------
const Challenge = ({ rigidChallenge }) => {
  useFrame(() => {
    const position = rigidChallenge?.current?.translation();

    rigidChallenge?.current?.setTranslation(
      { x: 0, y: position.y, z: 0 },
      false
    );
  });
  return (
    <group dispose={null} position={[-6.5, 10, 2.5]} name="meshChallenge">
      <mesh receiveShadow castShadow>
        <textGeometry
          args={["C", { font: font, size: 3, height: 1 }]}
        ></textGeometry>
        <meshStandardMaterial roughness={0.5} color="#0099FF" />
      </mesh>
      <mesh receiveShadow castShadow position={[2.7, 0, 0]}>
        <textGeometry
          args={["hallenge", { font: font, size: 2, height: 1 }]}
        ></textGeometry>
        <meshStandardMaterial roughness={0.5} color="#0099FF" />
        {/* 텍스트 색상 설정 */}
      </mesh>
    </group>
  );
};

// ---------------------- Growth ----------------------
const Growth = () => {
  const { scene } = useThree();
  const [position, setPosition] = useState<[x: number, y: number, z: number]>([
    -6.5, 10, 2.5,
  ]);
  const GowthRef = useRef(null);

  useEffect(() => {
    const meshChallenge = scene.getObjectByName("meshChallenge");

    const { x, z } = GowthRef.current.getWorldPosition(meshChallenge.position);
    setPosition([x, position[1], z]);
  }, []);

  return (
    <group dispose={null} ref={GowthRef} position={position}>
      <mesh receiveShadow castShadow>
        <textGeometry
          args={["G", { font: font, size: 3, height: 1 }]}
        ></textGeometry>
        <meshStandardMaterial roughness={0.5} color="#00ff95" />
      </mesh>
      <mesh receiveShadow castShadow position={[2.7, 0, 0]}>
        <textGeometry
          args={["Rowth", { font: font, size: 2, height: 1 }]}
        ></textGeometry>
        <meshStandardMaterial roughness={0.5} color="#00ff95" />
        {/* 텍스트 색상 설정 */}
      </mesh>
    </group>
  );
};

// ---------------------- Leejaeyeop ----------------------
const Leejaeyeop = () => {
  const { camera } = useThree();
  camera.position.set(-3, 4, 10);

  return (
    <group scale={[1.3, 1.3, 1.3]} position={[-10, 20, 12]} dispose={null}>
      <mesh receiveShadow castShadow>
        <textGeometry
          args={["Jaeyeop", { font: font, size: 2, height: 1 }]}
        ></textGeometry>
        <meshStandardMaterial roughness={0.5} color="#00ff95" />
        {/* 텍스트 색상 설정 */}
      </mesh>
    </group>
  );
};

export { Impossible, Challenge, Growth, Leejaeyeop };
