'use client';

import { useEffect } from 'react';
import { Element, scroller } from 'react-scroll';
import HeroSection from './hero-section';
import SkillsSection from './skills-section';
import ProjectSection from './project-section';
import BlogSection from './blog-section';
import ContactSection from './contact-section';
import { LANDING_SCROLL_OFFSET } from './landing-nav-config';

export default function LandingPage() {
  // useEffect(() => {
  //   const hash = window.location.hash.replace(/^#/, '');
  //   if (!hash) return;
  //   const t = window.setTimeout(() => {
  //     scroller.scrollTo(hash, {
  //       smooth: true,
  //       duration: 500,
  //       offset: LANDING_SCROLL_OFFSET,
  //     });
  //   }, 100);
  //   return () => window.clearTimeout(t);
  // }, []);

  return (
    <div className="flex w-full flex-col gap-0">
      <Element name="home">
        <HeroSection />
      </Element>

      <Element name="skills">
        <SkillsSection />
      </Element>

      <Element name="projects">
        <ProjectSection />
      </Element>

      <Element name="blog">
        <BlogSection />
      </Element>

      <Element name="contact">
        <ContactSection />
      </Element>
    </div>
  );
}
