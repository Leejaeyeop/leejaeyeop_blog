"use client";

import DraggableContainer from "@/components/molecules/DraggableImage";
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
import { Props } from "./articles";

const CommonSection = ({
  articles,
  imageSrcs,
}: {
  articles: React.ComponentType<Props>[];
  imageSrcs: string[];
}) => {
  const [curSection, updateCursection] = useState(-1);
  const sectionRefs = Array.from({ length: articles.length }, () =>
    useRef(null)
  );

  useEffect(() => {
    if (curSection >= 0) {
      // 해당 인덱스의 섹션으로 부드럽게 스크롤
      sectionRefs[curSection].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [curSection, sectionRefs]);

  const setCursection = useCallback(
    throttle(
      idx => {
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
        srcs={imageSrcs}
      />
      <div className="flex flex-col w-full sm:w-[calc(100%-300px)]">
        {articles.map((Article, idx) => (
          <div ref={sectionRefs[idx]} key={idx}>
            <Article idx={idx} setCursection={setCursection}></Article>
          </div>
        ))}
      </div>
    </div>
  );
};

const WorkSection = () => {
  return (
    <CommonSection
      articles={[ImqaArticle, DalgonaArticle, AsianArticle, BareunArticle]}
      imageSrcs={["imqa.webp", "dalgona.webp", "asian.webp", "bareun.webp"]}
    ></CommonSection>
  );
};

const PersonalSection = () => {
  return (
    <CommonSection
      articles={[FairyTaleArticle, ReactProgressBarArticle]}
      imageSrcs={["fairyTale.webp", "reactProgressBar.webp"]}
    ></CommonSection>
  );
};

const ExperienceSection = () => {
  return (
    <section className="text-2xl 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center">
      <div className="2xl:w-[1536px] w-full">
        <h1
          className={
            courgette.className + " font-extrabold text-9xl mb-16 break-words"
          }
        >
          Experience
        </h1>
        <h2 className={courgette.className + " font-extrabold text-6xl"}>
          Work
        </h2>
        <Separator className="mb-20"></Separator>
        <WorkSection></WorkSection>
        <h2
          className={
            courgette.className + " font-extrabold text-6xl break-words"
          }
        >
          Personal
        </h2>
        <Separator className="mb-20"></Separator>
        <PersonalSection></PersonalSection>
      </div>
    </section>
  );
};

export default ExperienceSection;
