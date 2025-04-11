import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const FrontendInfoSection = ({
  title,
  src,
  direction,
  children,
}: {
  title: string;
  src: string;
  direction: "left" | "right";
  children: React.ReactNode;
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <motion.div
      className="flex sm:flex-row flex-col justify-between gap-5"
      animate={isHover ? "hover" : "rest"}
      variants={{
        hover: { scale: 1.05 },
      }}
      onHoverStart={() => {
        setIsHover(true);
      }}
      onHoverEnd={() => {
        setIsHover(false);
      }}
    >
      {direction === "left" && (
        <div className="relative hidden sm:block sm:w-1/4 sm:h-60">
          <Image
            className="border rounded-3xl"
            src={src + ".webp"}
            alt={src}
            fill
          ></Image>
        </div>
      )}
      <div className="sm:w-1/2">
        <h3 className="text-5xl font-extrabold mb-10 flex-grow">{title}</h3>
        {children}
      </div>
      {direction === "right" && (
        <div className="relative hidden sm:block sm:w-1/4 sm:h-60">
          <Image
            className="border rounded-3xl"
            src={src + ".webp"}
            alt={src}
            fill
          ></Image>
        </div>
      )}
    </motion.div>
  );
};
export default FrontendInfoSection;
