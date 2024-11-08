import Image from "next/image";
import DraggableImage from "../../../components/molecular/DraggableImage";
import { useRef } from "react";
const ExperienceSection = () => {
  return (
    <section className=" text-black m-40 text-2xl">
      <h1 className=" font-extrabold text-9xl">Experience</h1>
      {/* imqa / ai 달고나 / 아시아 문헌 / 바른 ai */}
      <div>
        {/* image set */}
        <DraggableImage></DraggableImage>
        <div>
          {/* <Image /> */}
          <article>
            <h1>IMQA</h1>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
