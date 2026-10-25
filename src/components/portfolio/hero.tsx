import Image from 'next/image';
import { ArrowRight, Code2 } from 'lucide-react';
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import Resume from '@/components/common-component/resume/resume';
import { Reveal } from './motion';

export default function PortfolioHero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="portfolio-hero portfolio-container"
    >
      <Reveal className="hero-copy" group>
        <div data-reveal-item className="hero-intro">
          <span className="status-dot" /> FRONT-END DEVELOPER · BANGLADESH
        </div>
        <h1 data-reveal-item id="hero-title">
          Thoughtful interfaces.
          <br />
          Powerful <span>experiences.</span>
        </h1>
        <p data-reveal-item className="hero-description">
          I&apos;m Rajiul — a frontend developer building fast, intuitive web
          experiences with React, Next.js &amp; TypeScript.
        </p>
        <div data-reveal-item className="hero-actions">
          <a href="#selected-work" className="portfolio-button button-primary">
            Explore my work <ArrowRight size={18} />
          </a>
          <Resume
            label="Download résumé"
            className="portfolio-button button-secondary"
          />
        </div>
        <div
          data-reveal-item
          className="hero-stack"
          aria-label="Core technologies"
        >
          {[
            { name: 'React', Icon: SiReact, color: '#61dafb' },
            { name: 'Next.js', Icon: SiNextdotjs, color: '#f4f5f4' },
            { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
            { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38bdf8' },
            { name: 'Node.js', Icon: SiNodedotjs, color: '#83b449' },
          ].map(({ name, Icon, color }) => (
            <span key={name}>
              <Icon size={23} style={{ color }} aria-hidden="true" />
              <span>{name}</span>
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal className="hero-portrait-wrap">
        <div className="hero-portrait">
          <span className="portrait-outline" aria-hidden="true" />
          <div className="portrait-note" aria-hidden="true">
            Build interfaces
            <br />
            that matter.
            <span />
          </div>
          <Image
            src="/images/rajiul.png"
            alt="Rajiul Islam in a black jacket and sunglasses"
            width={388}
            height={643}
            priority
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 480px, 85vw"
            className="portrait-image"
          />
          <div className="portrait-caption">
            <span className="portrait-avatar">
              <Code2 size={20} />
            </span>
            <div>
              <strong>Rajiul Islam</strong>
              <span>Front-End Developer</span>
              <small>React &amp; TypeScript</small>
            </div>
          </div>
          <div className="portrait-tech" aria-label="Primary stack">
            <span>
              <SiReact /> React
            </span>
            <span>
              <SiNextdotjs /> Next.js
            </span>
            <span>
              <SiTypescript /> TypeScript
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
