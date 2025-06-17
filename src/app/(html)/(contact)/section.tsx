import { Courgette } from "next/font/google";
import Image from "next/image";
import { useFormState } from "react-dom";
import { submitForm } from "./actions";
import SubmitButton from "@/components/molecules/button/SubmitButton";

const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});

const ContactSection = () => {
  const [state, formAction] = useFormState(submitForm, null);

  return (
    <section className={"h-full"}>
      {/* header */}
      <header className="w-full mb-12">
        <div>
          <h1
            className={`${courgette.className} font-extrabold text-9xl mb-4 break-words`}
          >
            Contact
          </h1>
          <p className="text-2xl font-bold break-words">
            Please contact me if you have any questions or suggestions.
          </p>
        </div>
      </header>
      {/* content */}
      <section className="flex flex-col gap-4 mb-40 w-full items-center">
        {/* Link to Github / Tech Blog */}
        <div className="flex justify-center items-center gap-16 mb-12">
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
            <h1 className="text-4xl font-bold inline align-middle">
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
        </div>
        {/* email */}
        <div className="font-bold flex text-3xl break-words gap-6 w-2/4 items-end">
          <label htmlFor="email">Email</label>
          <p className="text-2xl">dlwoduq1011@gamil.com</p>
        </div>
        {/* email 전송 form */}
        <form
          action={formAction}
          className="flex flex-col gap-8 mb-40 w-2/4 text-2xl"
        >
          {/* state 조건부 렌더링 */}
          <div className="h-4 text-xl">
            {/* 에러 메시지 */}
            {state?.error && <p className="text-red-500">{state.error}</p>}
            {/* 성공 메시지 */}
            {state?.success && (
              <p className="text-green-500 ">{state.success}</p>
            )}
          </div>

          <label htmlFor="name">Your Name</label>
          <input
            className="text-black text-2xl p-2"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <label htmlFor="email">Your Email</label>
          <input
            className="text-black text-2xl p-2"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            className="text-black text-2xl p-2 leading-9"
            onWheel={event => event.stopPropagation()} // 스크롤 시 버블링 방지
            rows={4}
          ></textarea>
          <SubmitButton />
        </form>
      </section>
    </section>
  );
};

export default ContactSection;
