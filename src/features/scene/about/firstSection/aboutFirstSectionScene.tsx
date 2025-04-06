"use client";

import {
  useRef,
  useMemo,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
// 3D
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "./lib/shaders/vertex.glsl";
import fragmentShader from "./lib/shaders/fragment.glsl";
import { MathUtils, Vector2, MeshStandardMaterial } from "three";
import { useDomToCanvas } from "@/features/scene/about/firstSection/hooks/useDomToCanvas";

import { HtmlContent } from "@/features/scene/about/firstSection/components/html/htmlComponents";

function Scene({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
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

  useFrame(state => {
    if (!materialRef.current) return;
    const mouse = state.pointer;
    mouseLerped.current.x = MathUtils.lerp(mouseLerped.current.x, mouse.x, 0.1);
    mouseLerped.current.y = MathUtils.lerp(mouseLerped.current.y, mouse.y, 0.1);
    materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
    materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
  });

  useEffect(() => {
    if (domEl && textureDOM && materialRef.current) {
      setIsLoading(false);
    }
  }, [domEl, textureDOM, setIsLoading]);

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div
          ref={el => {
            setDomEl(el);
          }}
          className="title3D flex-col lg:flex-row"
        >
          <HtmlContent />
        </div>
      </Html>
      {textureDOM && (
        <mesh>
          <planeGeometry args={[width, height, 254, 254]} />
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
          <pointLight
            color="#ffffff"
            intensity={40}
            distance={12}
            decay={1}
            position={[2, 4, 6]}
          />
        </mesh>
      )}
    </>
  );
}

export default Scene;
