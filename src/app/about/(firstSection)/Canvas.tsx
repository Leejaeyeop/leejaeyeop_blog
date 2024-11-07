"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { debounce } from "lodash";
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
      const canvas = await html2canvas(domEl, {
        backgroundColor: null,
      });
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

const Aside = () => {
  return (
    <aside className="text-lg flex flex-col mr-7 gap-10 relative">
      <article className="flex flex-col gap-8 w-[400px]">
        <div>
          <p className="text-4xl mb-1">성장에 목마른 개발자</p>
          <p className="opacity-90">Impossible is nothing</p>
        </div>
        <div>
          <p className="mb-1 opacity-90">Growth</p>
          <p>I am the most thirsty for growth than anyone else</p>
        </div>
        <div>
          <p className="mb-1 opacity-90">Challenge</p>
          <p>
            They are not afraid of challenges <br />
            but rather enjoy them.
          </p>
        </div>
        <div>
          <p className="mb-1 opacity-90">Passion</p>
          <p>I'm always on fire with hot passion.</p>
        </div>
      </article>
    </aside>
  );
};

const HtmlContent = () => {
  return (
    <>
      <section>
        <article>
          <p className="flex flex-col">
            Hi
            <br />
            There
            <br />
            I&apos;m
            <br />
            Jaeyeop
          </p>
        </article>
      </section>
      <Aside />
    </>
  );
};

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
          <HtmlContent />
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
        <pointLight
          color="#ffffff"
          intensity={40}
          distance={12}
          decay={1}
          position={[2, 4, 6]}
        />
      </mesh>
    </>
  );
}

export default Scene;
