import HeroSection from "./hero-section";
import SkillsSection from "./skills-section";
import ProjectSection from "./project-section";
import BlogSection from "./blog-section";
import ContactSection from "./contact-section";

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col gap-0">
      <section id="home">
        <HeroSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="projects">
        <ProjectSection />
      </section>

      <section id="blog">
        <BlogSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
}
