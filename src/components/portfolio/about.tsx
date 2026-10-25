import {
  ArrowUpRight,
  Code2,
  Database,
  Wrench,
  BriefcaseBusiness,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { frontendCvData } from '@/app/(common)/resume/frontend-cv-data';
import { Reveal } from './motion';
import { Eyebrow } from './section-heading';

const expertise = [
  {
    title: 'Front-end (core focus)',
    Icon: Code2,
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'TanStack Query',
    ],
  },
  {
    title: 'Back-end (MERN)',
    Icon: Database,
    skills: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'REST APIs',
      'JWT auth',
    ],
  },
  {
    title: 'Tools',
    Icon: Wrench,
    skills: ['Git', 'GitHub', 'Figma', 'shadcn/ui', 'Jest', 'React Hook Form'],
  },
];
export function AboutSection() {
  return (
    <section
      id="about"
      className="portfolio-section portfolio-container"
      aria-labelledby="about-heading"
    >
      <Reveal className="about-layout">
        <div className="about-copy">
          <Eyebrow>About me</Eyebrow>
          <h2 id="about-heading">
            Built with care.
            <br />
            Designed <span className="lime">to scale.</span>
          </h2>
          <p>
            I&apos;m a MERN stack developer who spends most of my time on the
            front end — turning complex requirements into clear, accessible
            interfaces with reusable React components and maintainable
            TypeScript. Because I understand the Node.js, Express and MongoDB
            side too, the UIs I build fit cleanly with the APIs behind them.
          </p>
          <a
            href="/resume?templete=frontend-cv"
            className="portfolio-button button-secondary button-small"
          >
            More about me <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="expertise-wrap">
          <Eyebrow>My expertise</Eyebrow>
          <div className="expertise-grid">
            {expertise.map(({ title, Icon, skills }) => (
              <div className="expertise-card" key={title}>
                <Icon size={30} strokeWidth={1.25} aria-hidden="true" />
                <h3>{title}</h3>
                <div className="technology-tags">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function JourneySection() {
  const experiences = frontendCvData.experiences;
  return (
    <section
      id="experience"
      className="portfolio-section portfolio-container"
      aria-labelledby="experience-heading"
    >
      <Reveal className="journey-layout">
        <div className="journey-heading">
          <Eyebrow>Experience & education</Eyebrow>
          <h2 id="experience-heading">
            My journey
            <br />
            <span className="lime">so far.</span>
          </h2>
          <p>Building on an engineering foundation.</p>
        </div>
        <div className="journey-grid">
          {experiences.map((experience) => (
            <article className="journey-card" key={experience.company}>
              <span className="journey-icon">
                <BriefcaseBusiness size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="journey-date">{experience.period}</p>
                <h3>{experience.jobTitle}</h3>
                <p className="journey-company">{experience.company}</p>
                <p>
                  {experience.company.startsWith('Digeon')
                    ? 'Building brand-specific tourism and booking interfaces with a shared API and reusable Next.js components.'
                    : 'Built OTA booking interfaces, role-based dashboards and a multi-tenant website builder.'}
                </p>
              </div>
            </article>
          ))}
          <article className="journey-card">
            <span className="journey-icon">
              <GraduationCap size={21} aria-hidden="true" />
            </span>
            <div>
              <p className="journey-date">
                {frontendCvData.education[0].period}
              </p>
              <h3>B.Sc. in Electrical & Electronic Engineering</h3>
              <p className="journey-company">
                {frontendCvData.education[0].institution}
              </p>
              <p>
                An engineering foundation in problem solving, systems and
                analytical thinking.
              </p>
            </div>
          </article>
          <article className="journey-card">
            <span className="journey-icon">
              <BookOpen size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="journey-date">Additional education & training</p>
              <h3>Electrical engineering & web development</h3>
              <p className="journey-company">
                {frontendCvData.education[1].institution}
              </p>
              <p>
                Diploma in Electrical · {frontendCvData.education[1].period}.
                Front End Web Development — Level 1 &amp; 2, Programming Hero.
              </p>
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
