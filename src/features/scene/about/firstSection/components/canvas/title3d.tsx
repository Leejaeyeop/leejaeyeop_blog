import Scene from "../../aboutFirstSectionScene";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Loader } from "lucide-react";

export const Title3D = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  return (
    <div className="h-[150vh] w-screen relative">
      {isLoading && (
        <div className="absolute w-full h-full text-black justify-center items-center flex">
          <Loader className="size-1/6 animate-spin shrink-0" />
        </div>
      )}
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
        }}
      >
        <Scene setIsLoading={setIsLoading} />
      </Canvas>
    </div>
  );
};
