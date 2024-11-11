import FirstSection from "./(firstSection)/section";
import AboutSection from "./(aboutSection)/section";
import ExperienceSection from "./(experienceSection)/section";

import Wave from "@/components/atom/Wave";
export default function About() {
  return (
    <>
      <FirstSection></FirstSection>
      {/* Wave */}
      <Wave />
      <section className="bg-black rounded-e-full">
        {/* 나의 이야기 */}
        <AboutSection></AboutSection>
        {/* 커리어 이야기 */}
        <ExperienceSection></ExperienceSection>
      </section>
    </>
  );
}
