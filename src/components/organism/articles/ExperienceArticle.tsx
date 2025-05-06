import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/molecules/accordion";
import { Noto_Sans_KR } from "next/font/google";
import { DebouncedFuncLeading } from "lodash";
const NotoSansKorean = Noto_Sans_KR({
  weight: ["200"],
  subsets: ["latin"],
});

export type ExperienceArticleProps = {
  currentSection: number;
  setCursection: DebouncedFuncLeading<(idx: any) => void>;
  idx: number;
  title: string;
  subtitle?: string | JSX.Element;
  contribution: string;
  skills: string | JSX.Element;
  content: string | JSX.Element;
  accordionContent?: string | JSX.Element;
};

const ExperienceArticle = ({
  currentSection,
  setCursection,
  idx,
  title,
  subtitle,
  contribution,
  skills,
  content,
  accordionContent,
}: ExperienceArticleProps) => {
  // 애니메이션 제어와 뷰 감지 훅 초기화
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.15, // 스크롤 영역에 10% 들어왔을 때 감지
    triggerOnce: false, // 한번만 애니메이션 실행
  });
  // 요소가 화면에 들어왔을 때 애니메이션 시작
  useEffect(() => {
    if (idx === currentSection) return;
    if (inView) {
      controls.start({ opacity: 1 });
      setCursection(idx);
    } else {
      controls.start({ opacity: 0.3 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      className={
        NotoSansKorean.className + " pt-[10vh] pb-[65vh] flex flex-col gap-7"
      }
      ref={ref}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-5xl font-extrabold">{title}</h2>
      <h3 className="text-3xl leading-10">{subtitle}</h3>
      <h3 className="text-3xl leading-10">{skills}</h3>
      <h3 className="text-3xl leading-10">{contribution}</h3>
      <ul className="text-3xl leading-10 flex flex-col gap-5 list-disc">
        {content}
      </ul>
      {accordionContent && (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-3xl">
              Problem & Solving (Click!)
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-3xl leading-10 flex flex-col gap-5 list-disc ml-5">
                {accordionContent}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </motion.div>
  );
};

export { ExperienceArticle };
