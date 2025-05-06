import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Euler, MathUtils, Quaternion } from "three";

export const MouseControlledCamera = () => {
  const { camera } = useThree();
  const pitch = useRef(0);
  const yaw = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const initialEuler = useRef(new Euler());
  const sensitivity = Math.PI * 0.02; // 감도 조정 가능

  useEffect(() => {
    // const euler = new Euler(-0.55, 0.44, 0.32, "YXZ");
    const euler = new Euler().copy(camera.rotation);

    initialEuler.current.copy(euler);
    pitch.current = euler.x;
    yaw.current = euler.y;
    camera.rotation.copy(euler);
  }, [camera]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;

      mouse.current.x = normalizedX;
      mouse.current.y = normalizedY;

      const basePitch = initialEuler.current.x;
      const baseYaw = initialEuler.current.y;

      // 마우스가 정중앙일 경우 => offset 0 → initialEuler 유지됨
      const offsetYaw = -normalizedX * sensitivity;
      const offsetPitch = -normalizedY * sensitivity;

      const targetYaw = baseYaw + offsetYaw;
      const targetPitch = basePitch + offsetPitch;

      pitch.current = MathUtils.clamp(
        targetPitch,
        basePitch - 0.2,
        basePitch + 0.6
      );
      yaw.current = MathUtils.clamp(targetYaw, baseYaw - 0.4, baseYaw + 0.4);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [sensitivity]);

  useFrame(() => {
    const quaternion = new Quaternion();
    quaternion.setFromEuler(new Euler(pitch.current, yaw.current, 0, "YXZ"));
    camera.quaternion.slerp(quaternion, 0.1);
  });

  return null;
};
