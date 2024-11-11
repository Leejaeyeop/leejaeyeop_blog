import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/molecular/accordion";
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
    threshold: 0.2, // 스크롤 영역에 10% 들어왔을 때 감지
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
      className="pt-[10vh] pb-[50vh] flex flex-col gap-7"
      ref={ref}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-6xl">{title}</h2>
      <h3>{subtitle}</h3>
      <h3>{skills}</h3>
      <h3>{contribution}</h3>
      <div className="text-xl leading-8">{content}</div>
      {accordionContent && (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl">
              Problem & Solving (Click!)
            </AccordionTrigger>
            <AccordionContent className="text-xl leading-relaxed">
              {accordionContent}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </motion.div>
  );
};

export { ExperienceArticle };
