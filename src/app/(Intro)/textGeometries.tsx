import { motion } from "framer-motion-3d";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import myFont from "../Roboto_Bold.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
extend({ TextGeometry });

// @ts-ignore
const font = new FontLoader().parse(myFont);
const Impossible = () => {
  return (
    <group dispose={null}>
      <motion.mesh receiveShadow castShadow></motion.mesh>
      <motion.group position={[-6.5, -0.5, 2.5]}>
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
    <group dispose={null}>
      <motion.group position={[-6.5, 10, 2.5]}>
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
  const { scene } = useThree();
  const targetBox = scene.getObjectByName("rigidChallenge");

  console.log(targetBox.position.x);
  console.log(targetBox.position.y);
  console.log(targetBox.position.z);

  return (
    <group dispose={null}>
      <motion.group position={[-5, 10, 2.5]}>
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
  const { camera } = useThree();
  camera.position.set(-3, 4, 10);

  return (
    <group scale={[1.3, 1.3, 1.3]} dispose={null}>
      <motion.group position={[-11, 20, 10]}>
        <motion.mesh receiveShadow castShadow position={[2.7, 0, 0]}>
          <textGeometry
            args={["Jaeyeop", { font: font, size: 2, height: 1 }]}
          ></textGeometry>
          <meshStandardMaterial roughness={0.5} color="#00ff95" />
          {/* 텍스트 색상 설정 */}
        </motion.mesh>
      </motion.group>
    </group>
  );
};

export { Impossible, Challenge, Growth, Leejaeyeop };