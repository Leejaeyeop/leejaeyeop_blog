import { Euler, Vector3 } from "three";

export const CAMERA_TARGETS = {
  projector: {
    position: new Vector3(0.68, 5.43, 8.85),
    rotation: new Euler(-0.55, 0.44, 0.32, "YXZ"),
  },
  ceiling: {
    position: new Vector3(-0.1, 4.0, 3.5),
    rotation: new Euler(-0.1, 0.023, 0.0046, "YXZ"),
  },
  seat: {
    position: new Vector3(-0.18, 3.27, 3.78),
    rotation: new Euler(-0.1, 0.023, 0.0046, "YXZ"),
  },
  screen: {
    position: new Vector3(0, 3.1, 0),
    rotation: new Euler(0, 0, 0, "YXZ"),
  },
} as const;
