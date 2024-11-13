export default function HeaderComponent() {
  return (
    <header className="fixed w-full flex z-50 backdrop-blur-md justify-between py-6 border-b border-white/60 text-white pointer-events-auto px-10">
      <span className="flex items-center gap-10">
        <a title="Link to Tech Blog" href="/">
          <h1 className="font-bold inline align-middle mr-2 text-3xl ">
            Lee Jaeyeop
          </h1>
        </a>
        <a href="#about">
          <h1 className="font-bold inline align-middle mr-2 text-xl">About</h1>
        </a>
        <a href="#experience">
          <h1 className="font-bold inline align-middle mr-2 text-xl">
            Experience
          </h1>
        </a>
        <a
          title="Link to Tech Blog"
          href="https://ljy1011.tistory.com/"
          target="_blank"
        >
          <h1 className="font-bold inline align-middle mr-2 ">Tech Blog</h1>
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
        <a
          title="Link to Github"
          href="https://github.com/Leejaeyeop/"
          target="_blank"
        >
          <h1 className="font-bold inline align-middle mr-2">Github</h1>
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
      <span className="font-bold flex items-center">dlwoduq1011@gmail.com</span>
    </header>
  );
}
