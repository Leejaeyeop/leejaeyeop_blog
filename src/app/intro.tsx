"use client";
import {
  Canvas,
  extend,
  Object3DNode,
  useThree,
  useFrame,
} from "@react-three/fiber";
import { OrbitControls, TransformControls } from "three-stdlib";
import { Scene } from "./Canvas";
import myFont from "./Roboto_Bold.json";
import { Suspense, useRef, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";

import { transition } from "./transition";
import { useAnimatedText } from "./use-animated-text";
// class CustomElement extends TextGeometry {}

// extend({ CustomElement });

// Add types to ThreeElements elements so primitives pick up on it
// declare module "@react-three/fiber" {
//   interface ThreeElements {
//     customElement: Object3DNode<CustomElement, typeof CustomElement>;
//   }
// }
// const font = new FontLoader().parse(myFont);

// const Intro = () => {
//   const camera = useRef(PerspectiveCamera);

//   return (
//     <div className="w-screen h-screen" id="canvas-container">
//       <Canvas className="w-full h-full">
//         <Suspense fallback={null}>
//           <PerspectiveCamera
//             makeDefault
//             fov={75}
//             position={[0, 0, 10]}
//           ></PerspectiveCamera>
//           <directionalLight color="white" position={[5, 5, 5]} />
//           <mesh position={[-1, 0, 0]}>
//             <customElement
//               args={["Challenge", { font: font, size: 1, height: 1 }]}
//             />
//             <meshStandardMaterial />
//           </mesh>
//           <mesh position={[0, 0, 0]}>
//             <customElement args={["&", { font: font, size: 1, height: 1 }]} />
//           </mesh>
//           <mesh position={[-5, 0, 0]}>
//             <customElement
//               args={["Growth", { font: font, size: 1, height: 1 }]}
//             />
//           </mesh>
//           <Lights></Lights>
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// };

const Intro = () => {
  const headerRef = useAnimatedText("불가능", transition);
  const [sizes, setSizes] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resizeHandler = () => {
      setSizes({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <MotionConfig transition={transition}>
      <motion.div
        style={{ width: sizes.width, height: sizes.height }}
        className="absolute"
        initial={false}
        animate={{
          backgroundColor: true ? "#c9ffed" : "#ff2558",
          color: true ? "#7fffd4" : "#c70f46",
        }}
      >
        <motion.h1 ref={headerRef} />
        <Scene />
      </motion.div>
    </MotionConfig>
  );
};

export default Intro;
