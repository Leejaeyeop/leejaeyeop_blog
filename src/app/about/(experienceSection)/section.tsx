"use client";

import DraggableContainer from "@/components/molecular/DraggableImage";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  ImqaArticle,
  DalgonaArticle,
  AsianArticle,
  BareunArticle,
  ReactProgressBarArticle,
  FairyTaleArticle,
} from "./articles";
import { Courgette } from "next/font/google";
import { throttle } from "lodash";
const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});
import { Separator } from "@/components/atom/separator";

const WorkSection = () => {
  const [curSection, updateCursection] = useState(-1);
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (curSection >= 0) {
      // 해당 인덱스의 섹션으로 부드럽게 스크롤
      sectionRefs[curSection].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [curSection, sectionRefs]);

  const setCursection = useCallback(
    throttle(
      (idx) => {
        updateCursection(idx);
      },
      300,
      { leading: true, trailing: false }
    ),
    []
  );

  return (
    <div className="flex gap-96">
      {/* image set */}
      <DraggableContainer
        curSection={curSection}
        setCursection={setCursection}
        srcs={["imqa.webp", "dalgona.webp", "bareun.webp", "asian.webp"]}
      />
      <div className="flex flex-col">
        <div ref={sectionRefs[0]}>
          <ImqaArticle idx={0} setCursection={setCursection}></ImqaArticle>
        </div>
        <div ref={sectionRefs[1]}>
          <DalgonaArticle
            idx={1}
            setCursection={setCursection}
          ></DalgonaArticle>
        </div>
        <div ref={sectionRefs[2]}>
          <AsianArticle idx={2} setCursection={setCursection}></AsianArticle>
        </div>
        <div ref={sectionRefs[3]}>
          <BareunArticle idx={3} setCursection={setCursection}></BareunArticle>
        </div>
      </div>
    </div>
  );
};

const PersonalSection = () => {
  const [curSection, updateCursection] = useState(-1);
  const sectionRefs = [useRef(null), useRef(null)];

  useEffect(() => {
    if (curSection >= 0) {
      // 해당 인덱스의 섹션으로 부드럽게 스크롤
      sectionRefs[curSection].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [curSection]);

  const setCursection = useCallback(
    throttle(
      (idx) => {
        updateCursection(idx);
      },
      500,
      { leading: true, trailing: false }
    ),
    []
  );

  return (
    <div className="flex gap-96">
      {/* image set */}
      <DraggableContainer
        curSection={curSection}
        setCursection={setCursection}
        srcs={["fairyTale.webp", "reactProgressBar.webp"]}
      />
      <div className="flex flex-col">
        <div ref={sectionRefs[0]}>
          <FairyTaleArticle
            idx={0}
            setCursection={setCursection}
          ></FairyTaleArticle>
        </div>
        <div ref={sectionRefs[1]}>
          <ReactProgressBarArticle
            idx={1}
            setCursection={setCursection}
          ></ReactProgressBarArticle>
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section className="m-40 text-2xl 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center">
      <div className="2xl:w-[1536px] w-full">
        <h1 className={courgette.className + " font-extrabold text-9xl mb-16"}>
          Experience
        </h1>
        <h2 className={courgette.className + " font-extrabold text-4xl"}>
          Work
        </h2>
        <Separator className="mb-20"></Separator>
        <WorkSection></WorkSection>
        <h2 className={courgette.className + " font-extrabold text-4xl"}>
          Personal
        </h2>
        <Separator className="mb-20"></Separator>
        <PersonalSection></PersonalSection>
      </div>
    </section>
  );
};

export default ExperienceSection;
