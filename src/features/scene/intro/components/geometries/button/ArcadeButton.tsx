import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
  createContext,
} from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { Mesh, MathUtils, DoubleSide, Group } from "three";
import { useCursor, Text } from "@react-three/drei";
import { ProgressIcon } from "../icons/ProgressIcon";
import { CancelIcon } from "../icons/CancelIcon";

type ArcadeButtonContextType = {
  hovered: boolean;
  setHovered: Dispatch<SetStateAction<boolean>>;
};
const ArcadeButtonContext = createContext<ArcadeButtonContextType | null>(null);

type WithoutHoverControl = {
  hovered?: undefined;
  setHovered?: undefined;
};

type ArcadeButtonRootPropsBase = {
  position: [number, number, number];
  scale?: number;
  children: ReactNode;
};

// Discriminated Union 패턴 (Tagged Union) 혹은
// Mutually Exclusive Props (서로 배타적인 props 조합)
// state, setState를 둘다 넘기거나 넘기지 않거나
type ArcadeButtonRootProps = ArcadeButtonRootPropsBase &
  (ArcadeButtonContextType | WithoutHoverControl);

/** Compound 구조의 ArcadeButton */
export const ArcadeButton = {
  Root: ({
    hovered: externalHovered,
    setHovered: externalSetHovered,
    position,
    scale = 1,
    children,
  }: ArcadeButtonRootProps) => {
    const [internalHovered, internalSetHovered] = useState(false);

    const hovered = externalHovered ?? internalHovered;
    const setHovered = externalSetHovered ?? internalSetHovered;

    return (
      <ArcadeButtonContext.Provider value={{ hovered, setHovered }}>
        <group position={position} scale={scale}>
          {children}
        </group>
      </ArcadeButtonContext.Provider>
    );
  },

  Base: () => (
    <mesh position={[0, 0, 0]} receiveShadow>
      <cylinderGeometry args={[0.45, 0.45, 0.05, 32]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  ),

  Top: ({
    color = "red",
    onClick,
  }: {
    color?: string;
    onClick: (event: ThreeEvent<MouseEvent>) => void;
  }) => {
    const ref = useRef<Mesh>(null);
    const { hovered, setHovered } = useContext(ArcadeButtonContext);
    useCursor(hovered);

    useFrame(({ clock }) => {
      if (ref.current) {
        const baseY = 0.05;
        const hoverOffset = hovered ? 0.01 : 0;
        ref.current.position.y =
          baseY + Math.sin(clock.getElapsedTime() * 3) * 0.003 + hoverOffset;

        const targetScale = hovered ? 1.1 : 1;
        ref.current.scale.setScalar(
          MathUtils.lerp(ref.current.scale.x, targetScale, 0.2)
        );
      }
    });

    const handleHover = (isHovering: boolean) => {
      setHovered(isHovering);
    };

    return (
      <mesh
        ref={ref}
        position={[0, 0.05, 0]}
        castShadow
        onPointerOver={() => handleHover(true)}
        onPointerOut={() => handleHover(false)}
        onClick={onClick}
      >
        <cylinderGeometry args={[0.38, 0.38, 0.1, 32]} />
        <meshStandardMaterial
          color={color}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
    );
  },

  Glow: () => {
    const { hovered } = useContext(ArcadeButtonContext);
    return hovered ? (
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.52, 64]} />
        <meshBasicMaterial
          color="cyan"
          transparent
          opacity={0.5}
          side={DoubleSide}
        />
      </mesh>
    ) : null;
  },

  Description: ({ text }: { text: string }) => {
    const positionY = 1.7;

    const { hovered } = useContext(ArcadeButtonContext);

    return hovered ? (
      <Text
        position={[0, positionY, 0]}
        fontSize={0.7}
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.003}
        material-toneMapped={false} // <- 중요! HDR 환경에서 색상 왜곡 방지
      >
        {text}
      </Text>
    ) : null;
  },

  Icon: ({ type }: { type: "progress" | "cancel" }) => {
    if (type === "progress") return <ProgressIcon />;
    if (type === "cancel") return <CancelIcon />;
    return null;
  },

  ClickHint: ({ show }: { show?: boolean }) => {
    const groupRef = useRef<Group>(null);
    const positionY = 2;

    useFrame(({ clock }) => {
      if (groupRef.current) {
        const t = clock.getElapsedTime();
        groupRef.current.position.y = positionY + Math.sin(t * 2) * 0.05;
      }
    });

    if (!show) return null;

    return (
      <group ref={groupRef} position={[0, positionY, 0]}>
        {/* 텍스트 */}
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false} // <- 중요! HDR 환경에서 색상 왜곡 방지
        >
          Click Me
        </Text>
        {/* 화살표 */}
        <Text
          fontSize={1}
          position={[0, -0.1, 0]}
          color="white"
          anchorX="center"
          anchorY="top"
          outlineColor="black"
          outlineWidth={0.003}
          material-toneMapped={false} // <- 중요! HDR 환경에서 색상 왜곡 방지
        >
          👇
        </Text>
      </group>
    );
  },
};
