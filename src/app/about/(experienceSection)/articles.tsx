import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ImqaArticle = ({ setCursection, idx }) => {
  // 애니메이션 제어와 뷰 감지 훅 초기화
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5, // 스크롤 영역에 10% 들어왔을 때 감지
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
      className="pb-[20vh]"
      ref={ref}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>IMQA</h2>
      <h3>웹/모바일 프론트엔드 성능 모니터링 SaaS</h3>
      <h3>Next.js / Vue.js / tanstack query / d3.js / vuex / tailwind / ws </h3>
      <h3>프로젝트 전체 기여도 - 30% / 프론트엔드 기여도 - 30 %</h3>
      <div>
        - 웹/모바일 성능 모니터링 서비스인 [IMQA](https://imqa.io/)의 프론트엔드
        파트를 담당해서 신규 기능 개발 및 유지보수 작업을 함
        <br />
        - 레거시 코드인 ejs와 비효율 ssr 방식을 채택한 Vue.js + express 로
        이루어진 시스템을, monorepo 및 Next.js 로 마이그레이션 하는 작업 진행중
        <br />
        - 해당 작업에서 전체적인 구조 및 코드스타일을 잡음
        <br />
        - javascript 로만 이루어진 코드 베이스를 typescript 로 마이그레이션
        <br />
        - 여러 모듈에서 공통적으로 사용하는 컴포넌트 들을 monorepo의 package
        화를 통해 한 곳에서 관리할 수 있도록 작업 - Next.js 마이그레이션과 함께,
        디자인팀과의 협업을 통해 Atomic Design System 도입
        <br />
        - shadcn-ui 기반으로, tailwind-css를 사용하여 compound component 패턴
        구현. 최대한 customize가 쉽고, 개발자가 사용하기 편하도록 작성
        <br />
        - storybook를 적용해, 디자인 시스템을 독립적으로 확인할 수 있고, ui
        개발을 함에 있어서도 컴포넌트를 독립적으로 개발할 수 있도록 함
        <br />
        - PR을 통한 코드리뷰 문화 도입
        <br />
        - Storybook 을 도입해 컴포넌트 테스트를 수행 함
        <br />
        - 오픈 소스 라이브러리 (d3.js) 를 직접 커스터마이징해 새로운 기능 (auto
        zoom) 구현
        <br />
        - 프론트엔드 성능 개선: - FCP / LCP 성능 각각 8.1s - 0.9s / 9.2s - 1.4s
        로 개선, 번들 사이즈 축소 (Node.js Compression,brotliCompress,Code
        spliting,Lazy Loading)
        <br />
        - 통합 대시보드 화면 구현: - 각 버전별 데이터를 일일이 확인해야 하는
        사용자 불편 Voc에 적극 대응. 한 눈에 확인할 수 있는 통합 대시보드 페이지
        구현을 통해 사용자 만족도 향상
        <br />
        - 반응형 컴포넌트 구현 - 데스크탑 환경만 고려한 기존 고정형 Ui 개선.
        지나치게 배제된 모바일 사용자를 최소한으로 지원해 Ui 만족도 개선
        <br />
      </div>
    </motion.div>
  );
};

const DalgonaArticle = ({ setCursection, idx }) => {
  // 애니메이션 제어와 뷰 감지 훅 초기화
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5, // 스크롤 영역에 10% 들어왔을 때 감지
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
      className="pb-[20vh]"
      ref={ref}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>AI 달고나</h2>
      <h3>음성/텍스트 데이터 라벨링 웹</h3>
      <h3>Vue.js (2,3) / Vuex / Vuetify </h3>
      <h3>프로젝트 전체 기여도 - 50% / 프론트엔드 기여도 - 70 %</h3>
      <div>
        - 서비스 기획/설계/구현 모두 참여: - 사용자 중심의 사고 방식으로 기존
        서비스의 단점을 개선 하고, 장점을 살리는 방향으로 서비스 기획/설계에
        적극 참여
        <br />
        - 서비스 기획/설계/구현 모두 참여: - 사용자 중심의 사고 방식으로 기존
        서비스의 단점을 개선 하고, 장점을 살리는 방향으로 서비스 기획/설계에
        적극 참여
        <br />
        - 공통 전역 컴포넌트 구현: - 개발자의 사용 편의성 증대를 위해 일부
        컴포넌트를 globalProperties로 전역 설정 후 외부 에서 `proxy` 변수로
        접근가능하게 함.
        <br />
        - 상태 관리 규칙 정의: - 컴포넌트 계층이 깊지 않을 경우 props / 계층이
        깊지만 복잡성이 낮거나 단순한 동작 제어인 경우 provide+inject / 컴포넌트
        계층과 복잡성이 깊어질 경우 상태 관리 라이브러리(vuex) 사용
        <br />
        - ci/cd 파이프라인 구축 (gitlab): - kubernetes 서비스 배포를 자동화 함.
        개발자가 직접 terminal 에서 명령어를 입력할 필요가 없어짐- UX를 고려한
        컴포넌트 기획/설계:
        <br />
        - 사용자 상호작용이 많이 있는 서비스 특성상, 사용자의 customizing 기능을
        극대화함. - 예시 - 사이즈와 위치 조절이 가능한 navbar/toolbar 구현 /
        자유로운 시각적 환경 구성을 위한 테마와 색상 변경 등
        <br />
        - 프론트엔드 성능 개선: - Google Lighthouse 점수가 60점으로 낮았던
        원인을 분석한 결과, LCP지표가 주된 원인임을 확인. 이미지 최적화를 통해
        이미지 크기를 86%정도 줄이고, 폰트 최적화를 더해 score를 81점으로 올림
        <br />- wav 음성 파일 재생 및 편집기 구현 (wavesurfer.js 라이브러리): -
        실시간으로 wav 데이터를 출력해 재생하고, 음성 파형에 맞는 자막 element를
        생성 및 동기화. 이를 통해 기존 텍스트 라벨링만 하던 회사의 기술적 범위를
        확장 시킴
      </div>
    </motion.div>
  );
};

export { ImqaArticle, DalgonaArticle };
