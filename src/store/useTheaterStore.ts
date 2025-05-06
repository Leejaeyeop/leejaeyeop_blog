import { CAMERA_TARGETS } from "@/constants/cameraPosition";
import { Euler, Quaternion, Vector3 } from "three";
import { create } from "zustand";

type TheaterState = {
  isProjectorOn: boolean;
  setIsProjectorOn: (value: boolean) => void;

  isScreenZoom: boolean;
  setIsScreenZoom: (value: boolean) => void;

  isScreenHovering: boolean;
  setIsScreenHovering: (value: boolean) => void;

  showScreen: boolean;
  setShowScreen: (value: boolean) => void;

  cameraPosition: { targetPosition: Vector3; targetQuaternion: Quaternion };
  cameraTarget: "projector" | "seat" | "screen";
  setCameraTarget: (target: "projector" | "seat" | "screen") => void;
  isCameraTransitioning: boolean;
  setIsCameraTransitioning: (value: boolean) => void;
  cameraTranstionSpeed: number;
  setCameraTranstionSpeed: (value: number) => void;
};

export const useTheaterStore = create<TheaterState>(set => ({
  isProjectorOn: false,
  setIsProjectorOn: value => set({ isProjectorOn: value }),

  isScreenZoom: false,
  setIsScreenZoom: (value: boolean) => set({ isScreenZoom: value }),

  isScreenHovering: false,
  setIsScreenHovering: (value: boolean) => set({ isScreenHovering: value }),

  showScreen: false,
  setShowScreen: (value: boolean) => set({ showScreen: value }),

  cameraPosition: {
    targetPosition: new Vector3(),
    targetQuaternion: new Quaternion(),
  },
  cameraTarget: "projector",
  setCameraTarget: target => {
    set({ isCameraTransitioning: true, cameraTarget: target });
    switch (target) {
      case "projector":
        set({
          cameraPosition: {
            targetPosition: CAMERA_TARGETS.projector.position,
            targetQuaternion: new Quaternion().setFromEuler(
              CAMERA_TARGETS.projector.rotation
            ),
          },
        });
        break;
      case "seat":
        set({
          cameraPosition: {
            targetPosition: CAMERA_TARGETS.seat.position,
            targetQuaternion: new Quaternion().setFromEuler(
              CAMERA_TARGETS.seat.rotation
            ),
          },
        });
        break;
      case "screen":
        set({
          cameraPosition: {
            targetPosition: CAMERA_TARGETS.screen.position,
            targetQuaternion: new Quaternion().setFromEuler(
              CAMERA_TARGETS.screen.rotation
            ),
          },
        });
        break;
    }
  },
  isCameraTransitioning: false,
  setIsCameraTransitioning: value => set({ isCameraTransitioning: value }),

  cameraTranstionSpeed: 0.03,
  setCameraTranstionSpeed: (value: number) =>
    set({ cameraTranstionSpeed: value }),
}));
