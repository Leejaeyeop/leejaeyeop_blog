import { useRef } from "react";

export const CinemaLights = () => {
  const directionalLightRef = useRef(null);
  const pointLightRef = useRef(null);
  // const ambient = useControls("Ambient Light", {
  //   intensity: { value: 0.0, min: 0, max: 2 },
  //   color: "#ffffff",
  // });

  // const directional = useControls("Directional Light", {
  //   intensity: { value: 0.125, min: 0, max: 5 },
  //   position: { value: [0, 5, 5] },
  //   color: "#ffffff",
  // });

  // const point = useControls("Point Light", {
  //   intensity: { value: 1, min: 0, max: 5 },
  //   position: { value: [-0.5, 2, 3] },
  //   angle: { value: 0, min: 0, max: Math.PI / 2 },
  //   penumbra: { value: 1, min: 0, max: 1 },
  //   color: "#ffffff",
  // });

  // const rect = useControls("Rect Light", {
  //   intensity: { value: 3.5, min: 0, max: 15 },
  //   width: { value: 4 },
  //   height: { value: 3 },
  //   position: { value: [0, 3, -4] },
  //   rotation: { value: [0, 0, 0] },
  //   color: "#ffffff",
  // });
  // useHelper(directionalLightRef, DirectionalLightHelper);
  // useHelper(spotLightRef, SpotLightHelper);
  // useHelper(pointLightRef, PointLightHelper);
  // useHelper(rectAreaLightRef, RectAreaLightHelper);
  return (
    <>
      {/* <ambientLight intensity={ambient.intensity} color={ambient.color} />
        <directionalLight
          ref={directionalLightRef}
          intensity={directional.intensity}
          position={directional.position}
          color={directional.color}
          castShadow
        />
        <pointLight
          ref={pointLightRef}
          intensity={point.intensity}
          position={point.position}
          color={point.color}
          castShadow
        />
        <rectAreaLight
          intensity={rect.intensity}
          width={rect.width}
          height={rect.height}
          position={rect.position}
          rotation={[0, -3.1, 0]}
          color="white"
          castShadow
        /> */}
      <ambientLight intensity={0} color="#ffffff" />
      <directionalLight
        ref={directionalLightRef}
        intensity={0.125}
        position={[0, 5, 5]}
        color="#ffffff"
        castShadow
      />
      <pointLight
        ref={pointLightRef}
        intensity={1}
        position={[-0.5, 2, 3]}
        color="#ffffff"
        castShadow
      />
      <rectAreaLight
        intensity={3.5}
        width={4}
        height={3}
        position={[0, 3, -4]}
        rotation={[0, -3.1, 0]}
        color="#ffffff"
        castShadow
      />
    </>
  );
};
