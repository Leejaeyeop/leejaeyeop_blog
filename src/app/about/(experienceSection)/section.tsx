"use client";

import DraggableContainer from "../../../components/molecular/DraggableImage";
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { ImqaArticle, DalgonaArticle } from "./articles";

const ExperienceSection = () => {
  const [curSection, setCursection] = useState(-1);
  const sectionRefs = [useRef(null), useRef(null)];

  useEffect(() => {
    if (curSection >= 0) {
      // 해당 인덱스의 섹션으로 부드럽게 스크롤
      sectionRefs[curSection].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [curSection]);

  return (
    <section className=" text-black m-40 text-2xl">
      <h1 className=" font-extrabold text-9xl mb-16">Experience</h1>
      {/* imqa / ai 달고나 / 아시아 문헌 / 바른 ai */}
      <div className="flex gap-96">
        {/* image set */}
        <DraggableContainer
          curSection={curSection}
          setCursection={setCursection}
          srcs={["imqa.webp", "dalgona.webp", "bareun.webp", "asian.webp"]}
        />
        <div className="flex flex-col overflow-visible">
          <div ref={sectionRefs[0]}>
            <ImqaArticle idx={0} setCursection={setCursection}></ImqaArticle>
          </div>
          <div ref={sectionRefs[1]}>
            <DalgonaArticle
              idx={1}
              setCursection={setCursection}
            ></DalgonaArticle>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
