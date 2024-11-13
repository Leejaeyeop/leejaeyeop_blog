import FirstSection from "./(firstSection)/section";
import AboutSection from "./(aboutSection)/section";
import ExperienceSection from "./(experienceSection)/section";
import Footer from "@/components/molecules/footer/Footer";

import Wave from "@/components/atom/Wave";
export default function About() {
  return (
    <>
      <FirstSection></FirstSection>
      {/* Wave */}
      <Wave />
      {/*  rounded-e-full */}
      <section className="bg-black w-full px-4 sm:px-40 pb-40 pt-[50vh] sm:pt-[10vw] rounded-e-full">
        {/* 나의 이야기 */}
        <AboutSection></AboutSection>
        {/* 커리어 이야기 */}
        <ExperienceSection></ExperienceSection>
        <Footer />
      </section>
    </>
  );
}
