import { motion } from "framer-motion";
import { Noto_Sans_KR, Courgette } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

/**적용하고자 하는 font*/
const NotoSansKorean = Noto_Sans_KR({
  weight: ["200"],
  subsets: ["latin"],
});
const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});

const FrontendInfoSection = ({
  title,
  src,
  direction,
  children,
}: {
  title: string;
  src: string;
  direction: "left" | "right";
  children: React.ReactNode;
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <motion.div
      className="flex sm:flex-row flex-col justify-between gap-5"
      animate={isHover ? "hover" : "rest"}
      variants={{
        hover: { scale: 1.05 },
      }}
      onHoverStart={() => {
        setIsHover(true);
      }}
      onHoverEnd={() => {
        setIsHover(false);
      }}
    >
      {direction === "left" && (
        <div className="relative hidden sm:block sm:w-1/4 sm:h-60">
          <Image
            className="border rounded-3xl"
            src={src + ".webp"}
            alt={src}
            fill
          ></Image>
        </div>
      )}
      <div className="sm:w-1/2">
        <h3 className="text-5xl font-extrabold mb-10 flex-grow">{title}</h3>
        {children}
      </div>
      {direction === "right" && (
        <div className="relative hidden sm:block sm:w-1/4 sm:h-60">
          <Image
            className="border rounded-3xl"
            src={src + ".webp"}
            alt={src}
            fill
          ></Image>
        </div>
      )}
    </motion.div>
  );
};

const FrontendInfoArticle = () => {
  return (
    <article className={NotoSansKorean.className + " flex flex-col gap-24"}>
      <h1 className={courgette.className + " text-6xl font-extrabold"}>
        Fronted Developer
      </h1>
      {/* 프론트엔드 성능*/}
      <FrontendInfoSection
        title="Frontend Performance"
        src="/coreWebVitals"
        direction="right"
      >
        <p className="opacity-80">
          프론트엔드 성능 모니터링 솔루션 IMQA 개발에 참여 했습니다. Web Vital을
          포함한 프론트엔드 성능과 최적화에 대한 이해도를 보유 하고 있습니다. 이
          경험을 기반으로 페이지 로딩 시간 단축 및 렌더링 최적화를 위해 lazy
          loading, 코드 스플리팅, 이미지 최적화 등을 활용했습니다.
        </p>
      </FrontendInfoSection>
      {/* 디자인 시스템 */}
      <FrontendInfoSection
        title="Design System"
        src="/atomicDesignFlow"
        direction="left"
      >
        <p className="opacity-80">
          디자인 팀과의 협업을 통해 Atomic 디자인 시스템 도입 제안
          했습니다.일관된 UI를 유지하기 위해, 컴포넌트 기반의 디자인 시스템을
          구축했습니다. 색상, 타이포그래피, 버튼, 입력 필드 등 기본 UI 요소들을
          재사용 가능한 컴포넌트로 구성하여, 개발자와 디자이너 간의 협업을
          용이하게 했습니다. 이를 통해 커뮤니케이션 비용 감소와 UI 통일성을 통한
          개발 생산성 증대에 기여 했습니다.
        </p>
      </FrontendInfoSection>
      {/* 재사용 가능한 컴포넌트 */}
      <FrontendInfoSection
        title="Reusable Component"
        src="/reusableComponents"
        direction="right"
      >
        <p className="opacity-80">
          Compound Component Pattern을 활용한 Headless UI 컴포넌트 설계를 경험
          했습니다. 컴포넌트 재사용성을 고려하여, 공통적으로 사용되는 UI
          요소들은 모두 개별적으로 개발하여 재사용할 수 있도록 했습니다. 각
          컴포넌트는 독립적이고 테스트 가능하도록 설계하여, 코드 품질을
          높였습니다.
        </p>
      </FrontendInfoSection>
      {/* 데이터 시각화 */}
      <FrontendInfoSection
        title="Data Visualization"
        src="/dataVisual"
        direction="left"
      >
        <p className="opacity-80">
          대시보드와 같은 데이터 시각화 요소를 효율적으로 구현하기 위해,
          D3.js등의 라이브러리를 사용해 동적인 차트와 그래프를 제작했습니다.
          데이터를 시각적으로 효과적으로 표현하기 위해 사용자 인터랙션을 고려한
          다양한 시각적 요소를 추가했습니다.
        </p>
      </FrontendInfoSection>
    </article>
  );
};

const PersonalInfoArticle = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row">
      <article className={NotoSansKorean.className + " mb-40 w-full sm:w-1/2 "}>
        <h1 className={courgette.className + " text-6xl font-extrabold mb-8"}>
          Flight to Developer
        </h1>
        <p>
          원래 항공기 조종사를 꿈꿨지만, 적성과 맞지 않아 고민하던 중 개발자이신
          아버지를 통해 개발을 접하게 되었습니다.
        </p>
        <br />
        <p>
          어느날 지인과 운동을 하다가 운동 기록을 남길 수 있는 앱이 있으면
          좋겠다는 이야기를 나눴고, 직접 필요한 앱을 만들어 보기로 결심했습니다.
          독학으로 Flutter를 배우며 첫 모바일 앱을 개발 하였고,지인이 이를 잘
          활용하는 모습을 보고 큰 만족감을 느꼈습니다. 이 경험을 계기로 개발의
          매력에 빠져 개발자의 길을 걷게 되었습니다.
        </p>
        <br />
        <p>
          Unity로 모바일 게임 앱을 만들어 출시해 보기도 하고, Arduino로 CDS
          센서를 다뤄 보기도 하다가, 빠른 기술 발전과 더 많은 사용자와 소통할 수
          있는 웹 개발의 매력에 매료되어 결국 웹 개발에 정착하게 되었습니다.
        </p>
      </article>
      <div className="relative w-full h-full sm:w-1/2 sm:h-1/2 top-[-100px] flex justify-center sm:justify-end">
        <Image
          className="rounded-3xl"
          src="/profile.webp"
          width={350}
          height={350}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
};

export { PersonalInfoArticle, FrontendInfoArticle };
