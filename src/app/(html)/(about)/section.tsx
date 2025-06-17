"use client";

import { Courgette } from "next/font/google";
import { FrontendInfoArticle, PersonalInfoArticle } from "./articles";
import Image from "next/image";
import { motion } from "framer-motion";
const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});

const WIDTH_IMAGE_SET = 1004;
const ImageSet = () => {
  return (
    <>
      <Image
        src="/badge/javascript.svg"
        alt="js"
        height={28}
        width={127}
      ></Image>
      <Image
        src="/badge/typescript.svg"
        alt="ts"
        height={28}
        width={127}
      ></Image>
      <Image src="/badge/react.svg" alt="react" height={28} width={86}></Image>
      <Image
        src="/badge/nextJs.svg"
        alt="nextJs"
        height={28}
        width={98}
      ></Image>
      <Image src="/badge/vueJs.svg" alt="vueJs" height={28} width={85}></Image>
      <Image
        src="/badge/nodeJs.svg"
        alt="nodeJs"
        height={28}
        width={100}
      ></Image>
      <Image
        src="/badge/threeJs.svg"
        alt="threeJs"
        height={28}
        width={101}
      ></Image>
      <Image
        src="/badge/expressJs.svg"
        alt="expressJs"
        height={28}
        width={122}
      ></Image>
    </>
  );
};

const AboutSection = () => {
  const ANIMATION_DURATION = 30;

  return (
    <section
      id="about"
      className="flex relative 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center"
    >
      <div className="w-full text-2xl ">
        <h1
          className={
            courgette.className + " font-extrabold text-9xl mb-40 w-[60%]"
          }
        >
          About
        </h1>
        <PersonalInfoArticle />
        <FrontendInfoArticle />
        {/* moving skills */}
        <div className="w-full my-40">
          <h1 className={courgette.className + " text-6xl font-extrabold mb-8"}>
            Skills
          </h1>
          <div className="w-full flex justify-center">
            <div
              className={`overflow-hidden`}
              style={{
                maxWidth: `${WIDTH_IMAGE_SET}px`,
              }}
            >
              {/* skill images */}
              <div
                className={`flex`}
                style={{
                  width: `${2 * WIDTH_IMAGE_SET}px`,
                }}
              >
                <motion.div
                  className={`flex gap-5 w-[${WIDTH_IMAGE_SET}px]  p-5`}
                  animate={{
                    x: [0, "-100%", "100%", 0],
                  }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    times: [0, 0.499, 0.5, 1],
                    ease: "linear",
                    repeatType: "loop",
                    repeat: Infinity,
                  }}
                  style={{
                    width: `${WIDTH_IMAGE_SET}px`,
                  }}
                >
                  <ImageSet />
                </motion.div>
                <motion.div
                  className={`flex gap-5 p-5`}
                  animate={{
                    x: [0, "-100%", "-200%"],
                  }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    times: [0, 0.5, 1],
                    ease: "linear",
                    repeatType: "loop",
                    repeat: Infinity,
                  }}
                  style={{
                    width: `${WIDTH_IMAGE_SET}px`,
                  }}
                >
                  <ImageSet />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
