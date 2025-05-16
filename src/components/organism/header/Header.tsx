"use client";
import Image from "next/image";
import { useState } from "react";

export default function HeaderComponent() {
  const [isOpenMobileNav, setIsOpenMobileNav] = useState<boolean>(false);
  return (
    <div className="fixed w-full flex z-50 bg-zinc-800  backdrop-blur-md gap-6 py-6 px-10 border-b border-white/60 mix-blend-difference text-white pointer-events-auto">
      <a className="z-[1]" title="Link to Tech Blog" href="/">
        <h1 className="font-bold inline align-middle mr-2 text-3xl">
          Lee Jaeyeop
        </h1>
      </a>
      <nav
        className={
          "sm:m-0 sm:w-auto sm:h-auto sm:flex-row sm:gap-10 sm:items-center sm:bg-inherit sm:static sm:pt-0 sm:flex flex-grow " +
          (isOpenMobileNav
            ? "absolute right-0 w-screen h-screen bg-black my-[-1.5rem] flex flex-col gap-10 pt-40 items-center break-words"
            : "hidden")
        }
      >
        {/* <a href="#about" onClick={() => setIsOpenMobileNav(false)}>
          <h1 className="text-2xl font-bold sm:inline sm:align-middle sm:mr-2 sm:text-xl">
            About
          </h1>
        </a>
        <a href="#experience" onClick={() => setIsOpenMobileNav(false)}>
          <h1 className="text-2xl font-bold sm:inline sm:align-middle sm:mr-2 sm:text-xl">
            Experience
          </h1>
        </a> */}
        <a
          title="Link to Tech Blog"
          href="https://ljy1011.tistory.com/"
          target="_blank"
        >
          <h1 className="text-xl sm:text-lg font-bold inline align-middle mr-2 ">
            Tech Blog
          </h1>
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
          <h1 className="font-bold text-xl sm:text-lg inline align-middle mr-2">
            Github
          </h1>
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
        <span className="font-bold items-center flex-grow justify-end flex text-sm break-words gap-2">
          <Image src="/mail.svg" alt="email" width={18} height={18}></Image>
          dlwoduq1011@gmail.com
        </span>
      </nav>
      <div className="flex flex-grow justify-end items-center sm:hidden z-[1]">
        {isOpenMobileNav ? (
          <div
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => setIsOpenMobileNav(false)}
          >
            <span className="w-8 h-1 bg-white rotate-45 absolute"></span>
            <span className="w-8 h-1 bg-white -rotate-45 absolute"></span>
          </div>
        ) : (
          <div
            className="w-8 h-6 flex flex-col justify-between items-center cursor-pointer"
            onClick={() => setIsOpenMobileNav(true)}
          >
            <span className="w-full h-1 bg-white rounded"></span>
            <span className="w-full h-1 bg-white rounded"></span>
            <span className="w-full h-1 bg-white rounded"></span>
          </div>
        )}
      </div>
    </div>
  );
}
