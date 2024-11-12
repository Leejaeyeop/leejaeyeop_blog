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
const NotoSansKorean = Noto_Sans_KR({
  weight: ["200"],
  subsets: ["latin"],
});

const ExperienceArticle = ({
  setCursection,
  idx,
  title,
  subtitle,
  contribution,
  skills,
  content,
  accordionContent,
}) => {
  // 애니메이션 제어와 뷰 감지 훅 초기화
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.15, // 스크롤 영역에 10% 들어왔을 때 감지
    triggerOnce: false, // 한번만 애니메이션 실행
  });
  // 요소가 화면에 들어왔을 때 애니메이션 시작
  useEffect(() => {
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
      <h3>{subtitle}</h3>
      <h3>{skills}</h3>
      <h3>{contribution}</h3>
      <ul className="text-xl leading-8 flex flex-col gap-5 list-disc">
        {content}
      </ul>
      {accordionContent && (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-3xl">
              Problem & Solving (Click!)
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-xl leading-8 flex flex-col gap-5 list-disc ml-5">
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
