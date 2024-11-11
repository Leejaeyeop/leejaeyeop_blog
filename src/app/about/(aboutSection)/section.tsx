"use client";

import { Courgette } from "next/font/google";
import { FrontendInfoArticle, PersonalInfoArticle } from "./articles";

const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});
const AboutSection = () => {
  return (
    <section className="flex relative 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center">
      <section className="w-full m-40 text-2xl 2xl:w-[1536px]">
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
        <div className="w-full">
          <h1 className="text-6xl font-extrabold mt-20 mb-8">Skills</h1>
          <div className="flex gap-5 my-10 justify-center">
            <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
            <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
            <img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D" />
            <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
            <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
            <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
            <img src="https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white" />
            <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutSection;
