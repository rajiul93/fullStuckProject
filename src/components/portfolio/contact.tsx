import { Github, Globe2, Linkedin, Mail, Phone } from 'lucide-react';
import { resumeData } from '@/app/(common)/resume/resume-data';
import PortfolioContactForm from './contact-form';
import { Reveal } from './motion';
import { Eyebrow } from './section-heading';

const contacts = [
  {
    Icon: Mail,
    text: resumeData.contact.email,
    detail: 'Drop me an email anytime.',
    href: `mailto:${resumeData.contact.email}`,
  },
  {
    Icon: Linkedin,
    text: 'linkedin.com/in/rajiul-islam-rayhan',
    detail: 'Connect with me on LinkedIn.',
    href: resumeData.contact.linkedInUrl,
  },
  {
    Icon: Github,
    text: 'github.com/rajiul93',
    detail: 'Explore my code and projects.',
    href: 'https://github.com/rajiul93',
  },
  {
    Icon: Phone,
    text: resumeData.contact.phone,
    detail: 'Prefer a conversation?',
    href: 'tel:+8801986570093',
  },
];
export default function PortfolioContact() {
  return (
    <section
      id="contact"
      className="portfolio-section portfolio-container"
      aria-labelledby="contact-heading"
    >
      <Reveal className="contact-layout">
        <div className="contact-copy">
          <Eyebrow>Get in touch</Eyebrow>
          <h2 id="contact-heading">
            Have something
            <br />
            on mind?
            <br />
            <span className="lime">Let&apos;s build it.</span>
          </h2>
          <p>
            I&apos;m always open to discussing new projects, creative ideas or
            opportunities to be part of your vision.
          </p>
        </div>
        <PortfolioContactForm />
        <div className="contact-links">
          {contacts.map(({ Icon, text, detail, href }) => (
            <a
              href={href}
              key={href}
              target={href.startsWith('https:') ? '_blank' : undefined}
              rel={
                href.startsWith('https:') ? 'noopener noreferrer' : undefined
              }
            >
              <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
              <span>
                <strong>{text}</strong>
                <small>{detail}</small>
              </span>
            </a>
          ))}
          <div className="contact-location">
            <Globe2 size={21} strokeWidth={1.5} aria-hidden="true" />
            <span>
              <strong>{resumeData.contact.location}</strong>
              <small>Working with teams across borders.</small>
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
