"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Suspense } from "react";

import { useTheaterStore } from "@/store/useTheaterStore";
import { useShallow } from "zustand/shallow";
import { CinemaLights } from "@/components/r3f/lights/cinemaLights";
import { LoaderOverlay } from "@/components/r3f/common/loading";
import { MouseControlledCamera } from "@/components/r3f/camera/mouseControlledCamera";
import { CameraTransition } from "@/components/r3f/camera/cameraTransition";
import { ResizeCamera } from "@/components/r3f/camera/resizeCamera";
import { TheaterModel } from "@/components/r3f/models/theaterModel";
import { ProjectorModel } from "@/components/r3f/models/projectorModel";
import { DustParticles } from "@/components/r3f/environments/dustParticles";
import { Effect } from "@/components/r3f/environments/effect";

export default function TheaterCanvas() {
  const [isProjectorOn, isCameraTransitioning, isScreenHovering] =
    useTheaterStore(
      useShallow(state => [
        state.isProjectorOn,
        state.isCameraTransitioning,
        state.isScreenHovering,
      ])
    );
  return (
    <div className="w-screen h-screen bg-black">
      <LoaderOverlay /> {/* 여기! 로딩 상태에 따라 표시됨 */}
      <Canvas className="w-full h-full">
        <PerspectiveCamera
          makeDefault
          position={[0.68, 5.43, 8.85]}
          rotation={[-0.55, 0.44, 0.32]}
        />
        <ResizeCamera />
        {isProjectorOn && <CinemaLights />}
        <DustParticles />
        {/* 모델 로딩 */}
        <Suspense fallback={null}>
          <TheaterModel />
        </Suspense>
        <Suspense fallback={null}>
          <ProjectorModel />
        </Suspense>
        <Effect />
        {/* TODO screen hover시 disabled */}
        {!isScreenHovering && !isCameraTransitioning && (
          <MouseControlledCamera />
        )}
        {isCameraTransitioning && <CameraTransition />}
        {/* <OrbitControls /> */}
        {/* <CameraDebugger /> */}
        {/* <Leva
        theme={{
          sizes: { titleBarHeight: "28px" },
          fontSizes: { root: "10px" },
        }}
      /> */}
      </Canvas>
    </div>
  );
}
