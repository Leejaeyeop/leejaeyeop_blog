import { ExperienceArticle as Article } from "@/components/organism/articles/ExperienceArticle";
import { Props } from "../articles";

const TsGuardArticle = (props: Props) => {
  return (
    <Article
      {...props}
      title={"Typescript 퀴즈 웹 게임"}
      subtitle={
        <>
          <a
            className="text-blue-500"
            href="https://www.typescriptquiz.com/"
            target="_blank"
          >
            https://www.typescriptquiz.com/
          </a>
          <br />
          <br />
          <a
            className="text-blue-500"
            href="https://github.com/Leejaeyeop/typescript-guard-game/"
            target="_blank"
          >
            https://github.com/Leejaeyeop/typescript-guard-game/
          </a>
        </>
      }
      skills={
        "Next/js(15) / Pixijs / tailwind / zustand / convex / github action"
      }
      contribution={"프로젝트 전체 기여도 - 100% / 프론트엔드 기여도 - 100 %"}
      content={
        <>
          <li>
            Typescript 학습을 재밌게 하기 위해 next.js 와 pixijs를 결합해 게임
            형식의 웹 제작
          </li>
          <li>
            serverless 서비스인 convex 를 사용해 간단하게 백엔드 및 db 기능 구현
          </li>
          <li>
            퀴즈 문제를 db에 업로드해 퀴즈 데이터만 업로드시 매번 next.js 를
            빌드 후 재 배포 해야하는 불필요한 프로세스 방지
          </li>
          <li>
            페이지 방문 및 새로고침시 정적인 퀴즈 데이터를 매번 GET 호출해야
            하는 비효율성을 개선하기 위해 next.js revalidate(isr)로 페이지 캐싱
            및 문제 업로드시 on demand revalidate로 캐싱 초기화 (ci/cd pipeline
            적용)
          </li>
        </>
      }
      accordionContent={
        <>
          <li>
            디자인 능력이 전무해 게임 그래픽 및 에니메이션 생성이 불가능 → ai를
            적극 활용해 도트 그래픽 생성 및 일부 그래픽 직접 수정
          </li>
          <li>
            게임 스테이지 시작시 api를 호출해 퀴즈 문제를 get 하는 과정에서
            네트워크 탭등에 답안이 유출됨 →
            <br />
            1. page를 서버 컴포넌트로 구현후 props를 통해 클라이언트 컴포넌트에
            data 전달
            <br />
            2. 불필요한 페이지의 api 재 호출 방지를 위해 isr 도입
            <br />
            3. monaco editor를 사용해 직접 클라이언트에서 실시간으로 ts 코드를
            검증해 퀴즈의 오답 여부 확인
          </li>
        </>
      }
    ></Article>
  );
};

const AutoCompleteNewTabSearchArticle = (props: Props) => {
  return (
    <Article
      {...props}
      title={"Chrome 확장 프로그램 Google/Youtube 자동완성 새 탭 검색"}
      subtitle={
        <a
          className="text-blue-500"
          href="https://github.com/Leejaeyeop/chrome-extension-autocomplete-new-tab"
          target="_blank"
        >
          https://github.com/Leejaeyeop/chrome-extension-autocomplete-new-tab
        </a>
      }
      skills={"Typescript / Vite / Chrome Extensions API"}
      contribution={"프로젝트 전체 기여도 - 100%"}
      content={
        <>
          <li>
            Google과 Youtube 검색 중 복수의 자동검색어 결과를 새 탭으로 띄워주는
            기능의 필요성을 직접 느껴 구현 후 배포
          </li>
          <li>
            a tag가 아니여서, 우클릭을 통한 새 탭 이동이 불가능한 자동검색어
            element에 새탭 이동 기능을 추가
          </li>
          <li>
            Chrome Extensions API를 사용해 Google 검색 페이지와 Youtube
            페이지에서 동작하는 DOM 조작 컨텐츠 스크립트 삽입
          </li>
          <li>
            Vite 빌드 툴로 개발 서버 구성(HMR 기능 탑재) 및 코드 번들링 작업으로
            프로덕션을 위해 최적화된 정적 에셋을 출력
          </li>
        </>
      }
    ></Article>
  );
};

const FairyTaleArticle = (props: Props) => {
  return (
    <Article
      {...props}
      title={"ChatGpt 활용 3D 인터렉티브 웹"}
      subtitle={
        <>
          <a
            className="text-blue-500"
            href="https://leejaeyeop.github.io/"
            target="_blank"
          >
            https://leejaeyeop.github.io/
          </a>
          <br />
          <br />
          <a
            className="text-blue-500"
            href="https://github.com/Leejaeyeop/ai_fairy_tale_book/"
            target="_blank"
          >
            https://github.com/Leejaeyeop/ai_fairy_tale_book
          </a>
        </>
      }
      skills={"Vue.js / Express.js / three.js / jest "}
      contribution={"프로젝트 전체 기여도 - 100% / 프론트엔드 기여도 - 100 %"}
      content={
        <>
          <li>
            웹 풀스택 + 배포 및 ci/cd 구축 (프론트엔드: vue.js + three.js)
          </li>
          <li>
            Jest 테스트 시나리오/코드 작성 (프론트엔드,백엔드 api 통신 Unit
            test)
          </li>
          <li>
            백엔드 node.js(express) 외부 rest api 요청 및 클라이언트 응답 구현
          </li>
          <li>외부 api: openAi api(동화 생성) / deepai api(삽화 생성) 활용</li>
          <li>배포 환경: 백엔드(Google cloudRun) + 프론트엔드(github Pages)</li>
          <li>webSocket으로 openai api 통신시 프론트엔드 로딩 화면 구현</li>
        </>
      }
      accordionContent={
        <>
          <li>
            성능 이슈: vue.js의 composition api나 option api를 three.js
            라이브러리와 동시 사용시 성능저하가 발생함 →
          </li>
          <li>
            3d 모델 & 에니메이션 관련 이슈: 동화책의 역할을 하는 3d 책 모델중
            필요한 에니메이션(페이지가 넘어가는 에니메이션)을 찾을수 없었음 → 3d
            모델과 에니메이션을 3d 모델링 tool(belnder)을 사용해 직접 만들기로
            결정 blender
          </li>
        </>
      }
    ></Article>
  );
};

const ReactProgressBarArticle = (props: Props) => {
  return (
    <Article
      {...props}
      title={"React ProgressBar Npm package"}
      subtitle={
        <>
          <p>React.js 오픈 소스 제작후 npm package로 배포</p>
          <a
            className="text-blue-500"
            href="https://www.npmjs.com/package/react-divided-progress-bar"
            target="_blank"
          >
            https://www.npmjs.com/package/react-divided-progress-bar
          </a>
          <br />
          <br />
          <a
            className="text-blue-500"
            href="https://github.com/Leejaeyeop/react-divided-progress-bar"
            target="_blank"
          >
            https://github.com/Leejaeyeop/react-divided-progress-bar
          </a>
        </>
      }
      skills={"React.js / Rollup / Storybook"}
      contribution={"프로젝트 전체 기여도 - 100% / 프론트엔드 기여도 - 100 %"}
      content={
        <>
          <li>
            업무 중, 타 라이브러리에서 제공하지 않는 퍼센트 구분 UI가 필요한
            Progress Bar 컴포넌트가 필요했던 경험이 있습니다. 이에 직접
            컴포넌트를 개발하였고, 재사용성과 공유를 위해 npm 패키지로 배포.
          </li>
          <li>
            React로 컴포넌트 구현 / Storybook을 통한 테스트 / Rollup를 통해
            번들링 후 npm 배포
          </li>
          <li>
            <a
              className="text-blue-500"
              href="https://ljy1011.tistory.com/203"
              target="_blank"
            >
              개발 & 개선 블로그 포스팅
            </a>
          </li>
          <li>
            <a
              className="text-blue-500"
              href="https://ljy1011.tistory.com/221"
              target="_blank"
            >
              Rollup을 통한 번들링 블로그 포스팅
            </a>
          </li>
        </>
      }
    ></Article>
  );
};

const PortfolioArticle = (props: Props) => {
  return (
    <Article
      {...props}
      title={"Portfolio"}
      subtitle={
        <>
          <a
            className="text-blue-500"
            href="https://github.com/Leejaeyeop/leejaeyeop_blog"
            target="_blank"
          >
            https://github.com/Leejaeyeop/leejaeyeop_blog
          </a>
        </>
      }
      skills={"Next.js / react-three / framer-motion"}
      contribution={"프로젝트 전체 기여도 - 100% / 프론트엔드 기여도 - 100 %"}
      content={
        <>
          <li>
            3D 에니메이션과 컴포넌트를 활용해 나 자신을 잘 드러내고자 제작
          </li>
          <li>직접 Blender 를 활용해 3D 모델 커스터마이징</li>
          <li>webGL의 glsl 쉐이더를 통해 각종 effect 구현</li>
        </>
      }
    ></Article>
  );
};

export {
  TsGuardArticle,
  AutoCompleteNewTabSearchArticle,
  FairyTaleArticle,
  ReactProgressBarArticle,
  PortfolioArticle,
};
