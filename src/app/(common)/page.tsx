import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeroSection from './home/hero-section';
import SkillsSection from './home/skills-section';
import BlogSection from './home/blog-section';
import ContactSection from './home/contact-section';
import ProjectSection from './home/project-section';

const HomePage = () => {
  return (
    <div className="">
      {/* Header */}

      {/* Hero Section */}
      <HeroSection />
      {/* Skills Section */}
      <SkillsSection />

      <ProjectSection />
      {/* Blog Section */}
      <BlogSection />
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
