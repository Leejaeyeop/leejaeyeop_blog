import { ExperienceArticle as Article } from "@/components/organism/articles/ExperienceArticle";

const ImqaArticle = (props) => {
  return (
    <Article
      {...props}
      title={"IMQA"}
      subtitle={"웹/모바일 프론트엔드 성능 모니터링 SaaS"}
      skills={
        "Next.js / Vue.js / tanstack query / d3.js / vuex / tailwind / ws"
      }
      contribution={"프로젝트 전체 기여도 - 25% / 프론트엔드 기여도 - 30 %"}
      content={
        <>
          <li>
            웹/모바일 성능 모니터링 서비스인 IMQA 의 프론트엔드 파트를 담당해서
            신규 기능 개발 및 유지보수 작업 진행
          </li>
          <li>
            레거시 코드인 ejs와 비효율 ssr 방식을 채택한 Vue.js + express 로
            이루어진 시스템을, monorepo 및 Next.js 로 마이그레이션 하는 작업
            진행. 해당 작업에서 전체적인 구조 및 코드스타일을 잡음
          </li>
          <li>
            javascript 로만 이루어진 코드 베이스를 typescript 로 마이그레이션
          </li>
          <li>
            여러 모듈에서 공통적으로 사용하는 컴포넌트 들을 monorepo의 package
            화를 통해 한 곳에서 관리할 수 있도록 작업
          </li>
          <li>
            Next.js 마이그레이션과 함께, 디자인팀과의 협업을 통해 Atomic Design
            System 도입
          </li>
          <li>
            shadcn-ui 기반으로, tailwind-css를 사용하여 compound component 패턴
            구현. 최대한 customize가 쉽고, 개발자가 사용하기 편하도록 작성
          </li>
          <li>
            storybook를 적용해, 디자인 시스템을 독립적으로 확인할 수 있고, ui
            개발을 함에 있어서도 컴포넌트를 독립적으로 개발할 수 있도록 함
          </li>
          <li> PR을 통한 코드리뷰 문화 도입</li>
          <li>
            오픈 소스 라이브러리 (d3.js) 를 직접 커스터마이징해 새로운 기능
            (auto zoom) 구현
          </li>
          <li>
            프론트엔드 성능 개선: - FCP / LCP 성능 각각 8.1s - 0.9s / 9.2s -
            1.4s 로 개선, Compression,brotliCompress,Code spliting,Lazy Loading
            등을 통해 번들 사이즈 축소
          </li>
          <li>
            통합 대시보드 화면 구현: - 각 버전별 데이터를 일일이 확인해야 하는
            사용자 불편 Voc에 적극 대응. 한 눈에 확인할 수 있는 통합 대시보드
            페이지 구현을 통해 사용자 만족도 향상
          </li>
          <li>
            반응형 컴포넌트 구현 - 데스크탑 환경만 고려한 기존 고정형 Ui 개선.
            지나치게 배제된 모바일 사용자를 최소한으로 지원해 Ui 만족도 개선
          </li>
        </>
      }
      accordionContent={
        <>
          <li>
            디자이너와 협업시 커뮤니케이션 비용이 과도하게 발생 → Design system
            + Storybook 도입 → Atomic Design System을 도입함으로서, 컴포넌트
            규칙을 서로 정하고 의견을 통일시켜 불필요한 커뮤니케이션을 줄임
          </li>
          <li>
            오픈 소스 라이브러리에서 원하는 기능을 제공 하지 않음 → 소스 코드
            분석후 해당 기능 직접 제작
          </li>
        </>
      }
    ></Article>
  );
};

const DalgonaArticle = (props) => {
  return (
    <Article
      {...props}
      title={"AI 달고나"}
      subtitle={"음성/텍스트 데이터 라벨링 웹"}
      skills={"Vue.js (2,3) / Vuex / Vuetify"}
      contribution={"프로젝트 전체 기여도 - 50% / 프론트엔드 기여도 - 70 %"}
      content={
        <>
          <li>
            서비스 기획/설계/구현 모두 참여: - 사용자 중심의 사고 방식으로 기존
            서비스의 단점을 개선 하고, 장점을 살리는 방향으로 서비스 기획/설계에
            적극 참여
          </li>
          <li>
            공통 전역 컴포넌트 구현: - 개발자의 사용 편의성 증대를 위해 일부
            컴포넌트를 globalProperties로 전역 설정 후 외부 에서 `proxy` 변수로
            접근가능하게 함.
          </li>
          <li>
            상태 관리 규칙 정의: - 컴포넌트 계층이 깊지 않을 경우 props / 계층이
            깊지만 복잡성이 낮거나 단순한 동작 제어인 경우 provide+inject /
            컴포넌트 계층과 복잡성이 깊어질 경우 상태 관리 라이브러리(vuex) 사용
          </li>
          <li>
            ci/cd 파이프라인 구축 (gitlab): - kubernetes 서비스 배포를 자동화
            함. 개발자가 직접 terminal 에서 명령어를 입력할 필요가 없어짐- UX를
            고려한 컴포넌트 기획/설계:
          </li>
          <li>
            사용자 상호작용이 많이 있는 서비스 특성상, 사용자의 customizing
            기능을 극대화함. - 예시 - 사이즈와 위치 조절이 가능한 navbar/toolbar
            구현 / 자유로운 시각적 환경 구성을 위한 테마와 색상 변경 등
          </li>
          <li>
            프론트엔드 성능 개선: - Google Lighthouse 점수가 60점으로 낮았던
            원인을 분석한 결과, LCP지표가 주된 원인임을 확인. 이미지 최적화를
            통해 이미지 크기를 86%정도 줄이고, 폰트 최적화를 더해 score를
            81점으로 올림
          </li>
          <li>
            wav 음성 파일 재생 및 편집기 구현 (wavesurfer.js 라이브러리): -
            실시간으로 wav 데이터를 출력해 재생하고, 음성 파형에 맞는 자막
            element를 생성 및 동기화. 이를 통해 기존 텍스트 라벨링만 하던 회사의
            기술적 범위를 확장 시킴
          </li>
        </>
      }
      accordionContent={
        <>
          <li>
            <strong>컴포넌트간 데이터 통신 및 상태 관리</strong>: 기존 서비스의
            문제 였던 <strong>props drilling</strong> 현상 개선이 필요
          </li>
          <li>
            컴포넌트 계층이 깊지 않을 경우 <strong>props</strong> 방식을 채택 /
            컴포넌트 계층이 깊어질 경우{" "}
            <strong>중앙 상태관리 라이브러리(vuex)로 dispatch action</strong>
          </li>
          <li>
            중앙 상태 관리는 어디까지나 <strong>데이터</strong>에 국한.
            컴포넌트의 단순 동작 제어 (button 클릭 여부와 같은)는 제외
          </li>
          <li>
            <strong>전역 컴포넌트를</strong> 어떻게 관리할 것인가? (
            <strong>modal</strong> 컴포넌트, <strong>alert snackbar</strong>{" "}
            컴포넌트)
          </li>
          <li>
            modal 컴포넌트에 <strong>vue3 built-in component</strong>인{" "}
            <strong>teleport</strong> 사용
          </li>
          <li>
            snackbar 컴포넌트는 app.config.globalProperties로 전역 설정 후 외부
            컴포넌트에서 getCurrentInstance 프로퍼티의 `proxy` 변수로 접근
            (global state 저장)
          </li>

          <li>
            <strong>공통 컴포넌트(Table, inputBox 등)</strong>에 기능 추가시{" "}
            <strong>props option을 계속 추가함</strong> → 해당 컴포넌트 사용
            컴포넌트의 <strong>side effect 초래</strong>
          </li>
          <li>
            Headless Ui Component → 데이터 로직과 ui를 분리. 데이터 로직은
            하나의 관심사만 담당한다.
          </li>
          <li>
            <strong> slot</strong>을 사용해 확장성과 재사용성을 증가
          </li>
          <li>
            <strong>
              provide, inject 나 props를 사용해 공통 컴포넌트의 동작 로직
            </strong>
            을 제어한다.
          </li>

          <li>
            <strong>웹 성능 최적화 이슈</strong>
          </li>
          <li> code spliting 진행 → lcp/fid 개선</li>
          <li>
            <strong>Dynamic import</strong>를 사용 → SPA의 특성상 모든 파일이
            로드 되어야 서버의 호출 없이 다음 페이지로의 전환이 이루어 지는데
            이를 <strong>Lazy Loading</strong>으로 처리하여{" "}
            <strong>초기 로딩을 분산</strong>
          </li>
          <li>
            Async Component 사용 → 조건부 불필요 컴포넌트를 import하는 것을
            막음. <code>&lt;Suspense&gt;</code> 빌트인 컴포넌트와 같이 사용
          </li>

          <li>
            wav 파일에 대한 <strong>사전 지식이 없는 상황</strong>에서{" "}
            <strong>
              분할된 wav 음성 데이터 출력 및 텍스트 블럭 render 요구
            </strong>
          </li>
          <li> 텍스트 블럭 기능은 wavesurfer.js에서 제공하지 않음.</li>
          <li>
            파형 생성 후 해당 box width를 계산함. 해당 width에 맞는 반응형
            텍스트 div block을 js 코드를 통해 생성. 이때 dom element에 접근
            가능한 ref를 사용해 dom element를 직접 조작함.
          </li>

          <li>
            <strong>navigator:</strong> 기존 서비스는 페이지 이동 navigator인{" "}
            <strong>breadcrumb를 각 컴포넌트에서 하드 코딩함</strong> →{" "}
            <strong>생산성/유지보수성 감소</strong>
          </li>
          <li>
            vue-router의 <strong>routes 객체들의 meta 오브젝트</strong> 내{" "}
            <strong>breadcrumb</strong> 정보를 미리 기입
          </li>
          <li>
            페이지 이동시 <strong>breadcrumb</strong> 컴포넌트에서{" "}
            <strong>watch</strong> property로 router 변경을 감지, 이후
            breadcrumb 변경 → 각 컴포넌트 내 하드코딩 방식 해결
          </li>

          <li>
            사용자가 <strong>작업량 통계</strong> 요청 시 개발자들이 직접 db
            쿼리를 돌린 뒤 결과를 excel로 보내줌 → 사용자와 개발자 모두 불편을
            겪음
          </li>
          <li>
            사용자가 언제든지 확인 가능한 chart.js 라이브러리 사용으로{" "}
            <strong>통계 페이지 구현</strong>을 통해 해결 → 데이터 시각화
          </li>
          <li>
            (트러블 슈팅/ rendering최적화) 작업 시 사용자의{" "}
            <strong>화면이 자주 버벅 거림</strong>
          </li>
          <li>
            <strong>lifecycle</strong> 문제: mounted hook에서 실행되어야 할
            렌더링 관련 함수가 updated hook에서 실행됨. 랜더링이 반복되어 성능을
            저하 시킴
          </li>
          <li>
            <strong>v-for key</strong> 지정을 index로 대충 지정함. 그 결과로
            배열이나 객체의 <strong>순서’만’</strong> 바뀔 때도{" "}
            <strong>리렌더링</strong>이 발생 → key를{" "}
            <strong>식별가능한 고유값</strong>으로 재지정
          </li>
          <li>
            자주 사라지고 나타나는 컴포넌트들이 <strong>v-if</strong>{" "}
            directive를 사용 → <strong>v-show</strong>로 변경
          </li>
          <li>
            <strong>리팩토링: 레거시 코드</strong>가 너무 방대하고 지저분하며
            비효율적
          </li>
        </>
      }
    ></Article>
  );
};

const AsianArticle = (props) => {
  return (
    <Article
      {...props}
      title={"아시아 문헌 정보 웹"}
      subtitle={"고대 아시아 문헌 정보 조회 웹"}
      skills={"Next.js / tailwind / pgsql / typescript"}
      contribution={"프로젝트 전체 기여도 - 100% / 프론트엔드 기여도 - 100%"}
      content={
        <>
          <li>
            설계/구현/배포/유지보수 모두 1인 진행: 프로젝트의 전반적인 흐름을
            이해하며 스스로 문제를 분석하고 해결책을 찾음
          </li>
          <li>
            Next.js 서버/클라이언트 풀스택 구현: 프론트엔드와 백엔드를 연결하는
            전반적인 개발 프로세스를 경험
          </li>
          <li>excel 파일 db 업로드 기능 구현 (typeorm + psql)</li>
          <li>
            초기에 개발자가 excel을 직접 전달 받아 db에 데이터를 insert 하는
            불편함 개선. 사용자가 직접 클라이언트에서 upload 가능하게끔 ui 및
            api 추가. 사용자와 개발자간 커뮤니케이션 비용 대폭 감소
          </li>
        </>
      }
      accordionContent={
        <>
          <li>
            (rendering최적화) React.js는 Vue.js와는 다르게 **렌더링 최적화**를
            더욱 더 신경 써야 함! → React.js의 메모제이션을 활용
            (**React.memo(), useCallback(), useMemo()**) → 제어 컴포넌트에서
            비제어 컴포넌트로 변경
          </li>
        </>
      }
    ></Article>
  );
};

const BareunArticle = (props) => {
  return (
    <Article
      {...props}
      title={"Bareun.ai"}
      subtitle={"고대 아시아 문헌 정보 조회 웹"}
      skills={"Vue.js / Express.js / Firestore"}
      contribution={"프로젝트 전체 기여도 - 70% / 프론트엔드 기여도 - 50 %"}
      content={
        <>
          <li>
            제품 소개 페이지 프론트엔드 기획/설계/구현 참여 (회원가입, 소셜
            로그인)
          </li>
          <li>
            제품 소개 페이지 백엔드 REST api 서버 구현 (회원가입, 로그인,
            소셜로그인 등)
          </li>
          <li>
            형태소 분석기(bareun) 백엔드 api key 발급 및 인증/로그/에러 처리
            서버 구축 (node.js)
          </li>
          <li>node.js 서버 와 firebase(firestore) 연동</li>
        </>
      }
    ></Article>
  );
};

const FairyTaleArticle = (props) => {
  return (
    <Article
      {...props}
      title={"ChatGpt 활용 3D 인터렉티브 웹"}
      subtitle={
        <a
          className="text-blue-500"
          href="https://leejaeyeop.github.io/"
          target="_blank"
        >
          https://leejaeyeop.github.io/
        </a>
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

const ReactProgressBarArticle = (props) => {
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
        </>
      }
      skills={"React.js / Storybook"}
      contribution={"프로젝트 전체 기여도 - 100% / 프론트엔드 기여도 - 100 %"}
      content={
        <>
          <li>
            React.js로 컴포넌트 라이브러리를 만들어 npm 을 통해 배포 하기 위해
            제작
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
              href="          https://ljy1011.tistory.com/221"
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

export {
  ImqaArticle,
  DalgonaArticle,
  AsianArticle,
  BareunArticle,
  FairyTaleArticle,
  ReactProgressBarArticle,
};
