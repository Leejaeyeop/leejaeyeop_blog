import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, memo } from "react";
import { Group, Vector3 } from "three";

const PARTICLE_COUNT = 15; // 파티클 수 감소로 성능 향상
const POSITION_RANGE_X = 4;
const POSITION_RANGE_Y = 4;
const POSITION_RANGE_Z = 2;
const SPEED_MIN = 0.5;
const SPEED_VARIATION = 0.5;
const OFFSET_MAX = 1000;
const X_AMPLITUDE = 0.05;
const Y_AMPLITUDE = 0.05;
const Z_AMPLITUDE = 0.02;
const Z_OSCILLATION_SPEED = 0.3;
const PARTICLE_RADIUS = 0.003;
const PARTICLE_SEGMENTS = 6; // 세그먼트 수 감소로 성능 향상
const PARTICLE_OPACITY = 0.4;
const PARTICLE_COLOR = "white";

export const DustParticles = memo(() => {
  const groupRef = useRef<Group>(null!);
  const lastUpdateTime = useRef(0);
  const UPDATE_INTERVAL = 1 / 30; // 30fps로 제한

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      data.push({
        basePosition: new Vector3(
          (Math.random() - 0.5) * POSITION_RANGE_X,
          Math.random() * POSITION_RANGE_Y,
          (Math.random() - 0.5) * POSITION_RANGE_Z
        ),
        speed: Math.random() * SPEED_VARIATION + SPEED_MIN,
        offset: Math.random() * OFFSET_MAX,
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    const currentTime = clock.getElapsedTime();

    // 프레임 레이트 제한으로 성능 최적화
    if (currentTime - lastUpdateTime.current < UPDATE_INTERVAL) return;
    lastUpdateTime.current = currentTime;

    const t = currentTime;
    groupRef.current.children.forEach((child, i) => {
      const data = particles[i];
      const x =
        data.basePosition.x +
        Math.sin(t * data.speed + data.offset) * X_AMPLITUDE;
      const y =
        data.basePosition.y +
        Math.cos(t * data.speed + data.offset) * Y_AMPLITUDE;
      const z =
        data.basePosition.z +
        Math.sin(t * Z_OSCILLATION_SPEED + data.offset) * Z_AMPLITUDE;
      child.position.set(x, y, z);
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.basePosition.clone()}>
          <circleGeometry args={[PARTICLE_RADIUS, PARTICLE_SEGMENTS]} />
          <meshBasicMaterial
            color={PARTICLE_COLOR}
            transparent
            opacity={PARTICLE_OPACITY}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
});

DustParticles.displayName = "DustParticles";
