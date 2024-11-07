import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="relative text-black m-40 text-2xl">
      <h1 className=" font-extrabold text-9xl">About</h1>
      <Image
        className="absolute right-10 top-[-30px]"
        src="/profile.webp"
        width={400}
        height={400}
        alt="Picture of the author"
      />
      <article className="md:w-[60%] mb-40">
        <h1 className="text-6xl font-extrabold mb-8">Flight to Developer</h1>
        <p>
          원래 항공기 조종사를 꿈꿨지만, 적성과 맞지 않아 고민하던 중 개발자이신
          아버지를 통해 개발을 접하게 되었습니다.
        </p>
        <br />
        <p>
          그러던 중, 지인과 운동을 하다가 운동 기록을 남길 수 있는 앱이 있으면
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
      <article className="md:w-[60%] flex flex-col gap-8">
        <h1 className="text-6xl font-extrabold mb-8">Fronted Developer</h1>
        {/* 프론트엔드 성능 , 디자인 시스템, 재사용 가능한 컴포넌트, 3D , 데이터 시각화 */}
        <div>
          <h3>{"<프론트엔드 성능/>"}</h3>
          <p className="opacity-70">
            프론트엔드 성능 모니터링 솔루션 IMQA 개발에 참여 했습니다. Web
            Vital을 포함한 프론트엔드 성능과 최적화에 대한 이해도를 보유 하고
            있습니다.
          </p>
          <h3>{"</프론트엔드 성능>"}</h3>
        </div>
        {/* 디자인 시스템 */}
        <div>
          <h3>{"<디자인 시스템/>"}</h3>
          <p className="opacity-70">
            디자인 팀과의 협업을 통해 디자인 시스템 도입 제안 했습니다. 이를
            통해 커뮤니케이션 비용 감소와 UI 통일성을 통한 개발 생산성 증대에
            기여 했습니다.
          </p>
          <h3>{"</디자인 시스템>"}</h3>
        </div>
        {/* 재사용 가능한 컴포넌트 */}
        <div>
          <h3>{"</재사용 가능한 컴포넌트/>"}</h3>
          <p className="opacity-70">
            Compound Component Pattern을 활용한 Headless UI 컴포넌트 설계를 경험
            했습니다. 컴포넌트 재사용성이 극대화 되어, 개발 생산성을 높였습니다.
          </p>
          <h3>{"</재사용 가능한 컴포넌트>"}</h3>
        </div>
        {/* 데이터 시각화 */}
        <div>
          <h3>{"</데이터 시각화/>"}</h3>
          <p className="opacity-70">
            다양한 Chart 라이브러리를 활용한 데이터 시각화 경험이 풍부 합니다.
            적재 적소의 ui/ux를 제공했습니다.
          </p>
          <h3>{"</데이터 시각화>"}</h3>
        </div>
        <h2>Skills</h2>
        {/*  */}
        Next.js React.js Vue.js Javascript Typescript Tailwind.css
      </article>
    </section>
  );
};

export default AboutSection;
