import { useProgress } from "@react-three/drei";
import { Playfair } from "next/font/google";

const playfair = Playfair({
  weight: ["800"],
  style: ["italic"],
  display: "swap",
  subsets: ["latin"],
});
// 로딩 UI 컴포넌트
export const LoaderOverlay = () => {
  const { progress, active } = useProgress();
  return active ? (
    <div
      className={
        playfair.className +
        " absolute top-0 left-0 w-screen h-screen bg-black flex items-center justify-center z-50"
      }
    >
      <div className="text-white text-6xl animate-pulse">
        Loading... {progress.toFixed(0)}%
      </div>
    </div>
  ) : null;
};
