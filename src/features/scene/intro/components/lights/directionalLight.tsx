import { motion } from "framer-motion-3d";
import { useControls } from "leva";
import { useRef } from "react";

const DirectionalLight = () => {
  const directionalLightRef = useRef();

  // useHelper(directionalLightRef, PointLightHelper, 1, "cyan");

  const config = useControls("DirecLights", {
    color: "#ffffff",
    intensity: { value: 5, min: 0, max: 10, step: 0.1 },
    position: { value: [0, 5, 10] },
  });
  return (
    <motion.directionalLight
      ref={directionalLightRef}
      variants={{
        on: {
          x: 0,
          y: 20,
          z: 200,
        },
      }}
      transition={{ duration: 1 }}
      {...config}
    />
  );
};

export default DirectionalLight;
