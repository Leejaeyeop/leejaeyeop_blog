import { Courgette } from "next/font/google";
import Image from "next/image";

const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});

const ContactArticle = () => {
  return (
    <article className="h-full">
      <h1
        className={`${courgette.className} font-extrabold text-9xl mb-4 break-words`}
      >
        Contact
      </h1>
      <p className="text-2xl font-bold mb-16 break-words">
        Please contact me if you have any questions or suggestions.
      </p>
      <div className="flex flex-col  justify-center items-center gap-32">
        <a
          title="Link to Github"
          href="https://github.com/Leejaeyeop/"
          target="_blank"
        >
          <Image
            src="/github.svg"
            alt="github"
            width={42}
            height={42}
            className="inline-block align-middle mr-2"
          />
          <h1 className="font-bold text-4xl inline align-middle mr-2">
            Github
          </h1>
          <svg
            className="h-6 ml-0.5 inline-block align-middle"
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
          title="Link to Tech Blog"
          href="https://ljy1011.tistory.com/"
          target="_blank"
        >
          <h1 className="text-4xl font-bold inline align-middle mr-2 ">
            Tech Blog
          </h1>
          <svg
            className="h-6 ml-0.5 inline-block align-middle"
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

        <span className="font-bold items-center flex-grow justify-end flex text-4xl break-words gap-2">
          <Image src="/mail.svg" alt="email" width={42} height={36}></Image>
          dlwoduq1011@gmail.com
        </span>
      </div>
    </article>
  );
};

export default ContactArticle;
