import { motion } from "framer-motion-3d";
import { useControls } from "leva";
import { useRef } from "react";

const SpotLight = () => {
  const spotLightRef = useRef();
  // useHelper(spotLightRef, PointLightHelper, 1, "cyan");

  const config = useControls("SpotLights", {
    color: "#ffffff",
    intensity: { value: 300, min: 0, max: 5000, step: 0.1 },
    position: { value: [0, 20, 12] },
    angle: { value: 1, min: 0, max: 5, step: 0.1 },
  });
  return (
    <motion.spotLight
      ref={spotLightRef}
      variants={{
        on: {
          x: 0,
          y: 10,
          z: 35,
        },
      }}
      transition={{ duration: 1 }}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-bias={-0.00001}
      castShadow
      {...config}
    />
  );
};

export default SpotLight;
