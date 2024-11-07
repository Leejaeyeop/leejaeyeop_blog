import FirstSection from "./(firstSection)/section";
import AboutSection from "./(aboutSection)/section";
import ExperienceSection from "./(experienceSection)/section";
export default function About() {
  return (
    <>
      <FirstSection></FirstSection>
      {/* 나의 이야기 */}
      <AboutSection></AboutSection>
      {/* 커리어 이야기 */}
      <ExperienceSection></ExperienceSection>
    </>
  );
}
