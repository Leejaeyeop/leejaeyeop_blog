import { motion } from "framer-motion-3d";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import myFont from "../Roboto_Bold.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useThree } from "@react-three/fiber";

extend({ TextGeometry });

// @ts-ignore
const font = new FontLoader().parse(myFont);
const Impossible = () => {
  return (
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      <motion.mesh receiveShadow castShadow></motion.mesh>
      <motion.group position={[-6.5, -0.5, 1.5]}>
        <motion.mesh receiveShadow castShadow rotation={[0, 0, -0.1]}>
          <textGeometry
            args={["I", { font: font, size: 2.5, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#ff0000" />
        </motion.mesh>
        <motion.mesh
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
        </motion.mesh>
      </motion.group>
    </group>
  );
};

const Challenge = () => {
  return (
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      <motion.group position={[-6.5, 10, 1.5]}>
        <motion.mesh receiveShadow castShadow>
          <textGeometry
            args={["C", { font: font, size: 3, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#0099FF" />
        </motion.mesh>
        <motion.mesh receiveShadow castShadow position={[2.7, 0, 0]}>
          <textGeometry
            args={["hallenge", { font: font, size: 2, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#0099FF" />
          {/* 텍스트 색상 설정 */}
        </motion.mesh>
      </motion.group>
    </group>
  );
};

const Growth = () => {
  const { camera } = useThree();
  // camera.lookAt(-2.5, 3, 8);

  camera.position.set(-2, 5.8, 8);
  return (
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      <motion.group position={[-6.5, 10, 1.5]}>
        <motion.mesh receiveShadow castShadow>
          <textGeometry
            args={["G", { font: font, size: 3, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#00ff95" />
        </motion.mesh>
        <motion.mesh receiveShadow castShadow position={[2.7, 0, 0]}>
          <textGeometry
            args={["Rowth", { font: font, size: 2, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#00ff95" />
          {/* 텍스트 색상 설정 */}
        </motion.mesh>
      </motion.group>
    </group>
  );
};

const Leejaeyeop = () => {
  return (
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      <motion.group position={[-6.5, 10, 1.5]}>
        <motion.mesh receiveShadow castShadow>
          <textGeometry
            args={["G", { font: font, size: 3, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#00ff95" />
        </motion.mesh>
        <motion.mesh receiveShadow castShadow position={[2.7, 0, 0]}>
          <textGeometry
            args={["Rowth", { font: font, size: 2, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#00ff95" />
          {/* 텍스트 색상 설정 */}
        </motion.mesh>
      </motion.group>
    </group>
  );
};

export { Impossible, Challenge, Growth, Leejaeyeop };
