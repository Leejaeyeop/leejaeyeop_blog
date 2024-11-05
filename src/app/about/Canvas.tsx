"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useControls } from "leva";
import debounce from "debounce";
import Image from "next/image";
// 3D
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import html2canvas from "html2canvas";
import { CanvasTexture, MathUtils, Vector2, MeshStandardMaterial } from "three";

const useDomToCanvas = (domEl) => {
  const [texture, setTexture] = useState<CanvasTexture>();
  useEffect(() => {
    if (!domEl) return;
    const convertDomToCanvas = async () => {
      const canvas = await html2canvas(domEl, { backgroundColor: null });
      setTexture(new CanvasTexture(canvas));
    };

    convertDomToCanvas();

    const debouncedResize = debounce(() => {
      convertDomToCanvas();
    }, 100);

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [domEl]);

  return texture;
};

function Lights() {
  const pointLightRef = useRef();

  const config = useControls("Lights", {
    color: "#ffffff",
    intensity: { value: 25, min: 0, max: 5000, step: 0.01 },
    distance: { value: 12, min: 0, max: 100, step: 0.1 },
    decay: { value: 1, min: 0, max: 5, step: 0.1 },
    position: { value: [2, 4, 6] },
  });
  return <pointLight ref={pointLightRef} {...config} />;
}

function Scene() {
  const state = useThree();
  const { width, height } = state.viewport;
  const [domEl, setDomEl] = useState(null);

  const materialRef = useRef(null);
  const textureDOM = useDomToCanvas(domEl);
  const uniforms = useMemo(() => {
    return {
      uTexture: { value: textureDOM },
      uMouse: { value: new Vector2(0, 0) },
    };
  }, [textureDOM]);

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const mouse = state.pointer;
    mouseLerped.current.x = MathUtils.lerp(mouseLerped.current.x, mouse.x, 0.1);
    mouseLerped.current.y = MathUtils.lerp(mouseLerped.current.y, mouse.y, 0.1);
    materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
    materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
  });

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div ref={(el) => setDomEl(el)} className="title3D">
          <p className="flex flex-col">
            Hi
            <br />
            There
            <br />
            I&apos;m
            <br />
            Jaeyeop
            <br />
          </p>
          <Image
            className="absolute right-10"
            src="/profile.webp"
            width={400}
            height={400}
            alt="Picture of the author"
            unoptimized
          />
        </div>
      </Html>
      <mesh>
        <planeGeometry args={[width, height, 254, 254]}></planeGeometry>
        <meshStandardMaterial roughness={0.5} color="#000000" />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          flatShading
          silent
        />
        <Lights />
      </mesh>
    </>
  );
}

export default Scene;
