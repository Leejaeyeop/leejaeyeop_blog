import { useEffect, useState } from "react";
import { ArcadeButton } from "./ArcadeButton";
import { motion } from "framer-motion-3d";
import { useRouter } from "next/navigation";
import { usePendingStore } from "@/app/(Intro)/store/usePendingStore";

const BUTTON_SPACING = 1;

type IntroButtonGroupProps = {
  moveNextSequence: () => void;
};

export const IntroButtonGroup = ({
  moveNextSequence,
}: IntroButtonGroupProps) => {
  const router = useRouter();

  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isProgressHintVisible, setIsProgressHintVisible] = useState(false);
  // 어떤 버튼이든 눌렸다.. disapear + disable
  const [isClicked, setIsClicked] = useState<null | "progress" | "cancel">(
    null
  );

  const setIsPending = usePendingStore(state => state.setIsPending);

  // isCancelHovered true시 progress hint의 visible 설정
  useEffect(() => {
    if (isCancelHovered) {
      setIsProgressHintVisible(false);
    } else {
      setIsProgressHintVisible(true);
    }
  }, [isCancelHovered]);

  return (
    <motion.group
      position={[0, 0, 6]}
      animate={{ z: isClicked ? [6, 5, 30] : 6 }} // 애니메이션 도착 위치
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
      scale={2}
      onAnimationComplete={() =>
        isClicked === "progress" ? moveNextSequence() : null
      }
    >
      <ArcadeButton.Root position={[-BUTTON_SPACING, 0, 0]}>
        <ArcadeButton.ClickHint show={isProgressHintVisible} />
        <ArcadeButton.Glow />
        <ArcadeButton.Top
          color="green"
          onClick={() => (isClicked ? null : setIsClicked("progress"))}
        />
        <ArcadeButton.Icon type="progress" />
        <ArcadeButton.Base />
      </ArcadeButton.Root>
      <ArcadeButton.Root
        hovered={isCancelHovered}
        setHovered={setIsCancelHovered}
        position={[BUTTON_SPACING, 0, 0]}
      >
        <ArcadeButton.Glow />
        <ArcadeButton.Description text="Skip Intro" />
        <ArcadeButton.Top
          color="red"
          onClick={() => {
            setIsClicked("cancel");
            setIsPending(true);
            router.push("/about");
          }}
        />
        <ArcadeButton.Icon type="cancel" />
        <ArcadeButton.Base />
      </ArcadeButton.Root>
    </motion.group>
  );
};
