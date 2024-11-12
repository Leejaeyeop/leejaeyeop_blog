export default function HeaderComponent() {
  return (
    <header className="fixed w-full flex gap-10 z-50 backdrop-blur-md items-center  py-6 border-b border-white/60  text-white pointer-events-auto px-10">
      <span>
        <a title="Link to Tech Blog" href="/">
          <h1 className="font-bold inline align-middle mr-2 text-3xl ">
            Lee Jaeyeop
          </h1>
        </a>
      </span>
      <span>
        <h1 className="font-bold inline align-middle mr-2 ">Tech Blog</h1>
        <a title="Link to Tech Blog" href="https://ljy1011.tistory.com/">
          <svg
            className="h-3 ml-0.5 inline-block align-middle"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.00006 0.25H11.7501V11H10.2501V2.81066L1.53039 11.5303L0.469727 10.4697L9.1894 1.75H1.00006V0.25Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </span>
      <span>
        <h1 className="font-bold inline align-middle mr-2">Github</h1>
        <a title="Link to Github" href="https://github.com/Leejaeyeop/">
          <svg
            className="h-3 ml-0.5 inline-block align-middle"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.00006 0.25H11.7501V11H10.2501V2.81066L1.53039 11.5303L0.469727 10.4697L9.1894 1.75H1.00006V0.25Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </span>
    </header>
  );
}
