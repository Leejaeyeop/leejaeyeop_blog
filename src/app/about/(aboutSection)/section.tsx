"use client";

import { Courgette } from "next/font/google";
import { FrontendInfoArticle, PersonalInfoArticle } from "./articles";
import Image from "next/image";
const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});

const Badge = () => {
  return;
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="flex relative 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center"
    >
      <section className="w-full text-2xl 2xl:w-[1536px]">
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
        <div className="w-full mt-40">
          <h1 className={courgette.className + " text-6xl font-extrabold mb-8"}>
            Skills
          </h1>
          <div className="flex gap-5 my-10 justify-center flex-wrap">
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
            <Image
              src="/badge/react.svg"
              alt="react"
              height={28}
              width={86}
            ></Image>
            <Image
              src="/badge/nextJs.svg"
              alt="nextJs"
              height={28}
              width={98}
            ></Image>
            <Image
              src="/badge/vueJs.svg"
              alt="vueJs"
              height={28}
              width={85}
            ></Image>
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
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutSection;
