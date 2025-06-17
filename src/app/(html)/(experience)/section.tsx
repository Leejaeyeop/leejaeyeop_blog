"use client";

import DraggableContainer from "@/components/molecules/DraggableImage";
import { useState, useCallback, useMemo, createRef } from "react";
import { Courgette } from "next/font/google";
import { throttle } from "lodash";
import { Separator } from "@/components/atom/separator";

import {
  ImqaArticle,
  DalgonaArticle,
  AsianArticle,
  BareunArticle,
  FairyTaleArticle,
  ReactProgressBarArticle,
  PortfolioArticle,
  Props,
  TsGuardArticle,
} from "./articles";

const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});

type CommonSectionProps = {
  articles: React.ComponentType<Props>[];
  imageSrcs: string[];
};

const CommonSection = ({ articles, imageSrcs }: CommonSectionProps) => {
  const [currentSection, setCurrentSection] = useState(-1);

  // Memoize section references based on the number of articles
  const sectionRefs = useMemo(
    () => articles.map(() => createRef<HTMLDivElement>()),
    [articles]
  );

  // Smooth scrolling to the current section
  // useEffect(() => {
  //   console.log(currentSection);
  //   if (currentSection >= 0) {
  //     sectionRefs[currentSection]?.current?.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }
  // }, [currentSection, sectionRefs]);

  // Throttled section update
  const updateCurrentSection = useMemo(
    () =>
      throttle(
        (index: number) => {
          setCurrentSection(index);
        },
        10,
        {
          leading: true,
          trailing: false,
        }
      ),
    [setCurrentSection]
  );

  return (
    <div className="flex gap-96">
      {/* Draggable Image Set */}
      <DraggableContainer
        curSection={currentSection}
        setCursection={updateCurrentSection}
        srcs={imageSrcs}
      />

      {/* Articles */}
      <div className="flex flex-col gap-[70vh] w-full lg:w-[calc(100%-360px)] mb-[65vh]">
        {articles.map((Article, index) => (
          <div ref={sectionRefs[index]} key={index}>
            <Article
              idx={index}
              setCursection={updateCurrentSection}
              currentSection={currentSection}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <>
    <h2
      className={`${courgette.className} font-extrabold text-6xl break-words`}
    >
      {title}
    </h2>
    <Separator className="mb-20" />
  </>
);

const WorkSection = () => (
  <CommonSection
    articles={[ImqaArticle, DalgonaArticle, AsianArticle, BareunArticle]}
    imageSrcs={["imqa.webp", "dalgona.webp", "asian.webp", "bareun.webp"]}
  />
);

const PersonalSection = () => (
  <CommonSection
    articles={[
      TsGuardArticle,
      FairyTaleArticle,
      ReactProgressBarArticle,
      PortfolioArticle,
    ]}
    imageSrcs={[
      "tsguard.webp",
      "fairyTale.webp",
      "reactProgressBar.webp",
      "portfolio.webp",
    ]}
  />
);

const ExperienceSection = () => (
  <section
    id="experience"
    className="text-2xl 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center"
  >
    {/* TODO: px값 별도 조정 해결 하기 */}
    <div className="2xl:w-[1536px] w-full px-10">
      <h1
        className={`${courgette.className} font-extrabold text-9xl mb-16 break-words`}
      >
        Experience
      </h1>
      <SectionHeader title="Work" />
      <WorkSection />
      <SectionHeader title="Personal" />
      <PersonalSection />
    </div>
  </section>
);

export default ExperienceSection;
