"use client";

import { Courgette } from "next/font/google";
import { FrontendInfoArticle, PersonalInfoArticle } from "./articles";

const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});
const AboutSection = () => {
  return (
    <section className="flex relative">
      <section className="w-full m-40 text-2xl">
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
          <h1 className="text-6xl font-extrabold mb-8">Skills</h1>
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
