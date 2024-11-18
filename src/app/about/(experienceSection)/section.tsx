"use client";

import DraggableContainer from "@/components/molecules/DraggableImage";
import { useEffect, useState, useCallback, useMemo, createRef } from "react";
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
import { Separator } from "@/components/atom/separator";
import { Props } from "./articles";

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
  useEffect(() => {
    if (currentSection >= 0) {
      sectionRefs[currentSection]?.current?.scrollIntoView({
        behavior: "auto",
      });
    }
  }, [currentSection, sectionRefs]);

  // Throttled section update
  const updateCurrentSection = useCallback(
    throttle((index: number) => setCurrentSection(index), 300, {
      leading: true,
      trailing: false,
    }),
    []
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
      <div className="flex flex-col w-full sm:w-[calc(100%-300px)]">
        {articles.map((Article, index) => (
          <div ref={sectionRefs[index]} key={index}>
            <Article idx={index} setCursection={updateCurrentSection} />
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
    articles={[FairyTaleArticle, ReactProgressBarArticle]}
    imageSrcs={["fairyTale.webp", "reactProgressBar.webp"]}
  />
);

const ExperienceSection = () => (
  <section
    id="experience"
    className="text-2xl 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center"
  >
    <div className="2xl:w-[1536px] w-full">
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
