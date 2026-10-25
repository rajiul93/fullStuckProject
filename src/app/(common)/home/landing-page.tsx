import PortfolioHero from '@/components/portfolio/hero';
import PortfolioProjects from '@/components/portfolio/projects';
import { AboutSection, JourneySection } from '@/components/portfolio/about';
import PortfolioBlog from '@/components/portfolio/blog';
import PortfolioContact from '@/components/portfolio/contact';
import type { Project } from '@/type/front/project-data-type';

export default function LandingPage({
  projects,
  error,
}: {
  projects?: Project[];
  error?: boolean;
}) {
  return (
    <>
      <PortfolioHero />
      <PortfolioProjects initialProjects={projects} initialError={error} />
      <AboutSection />
      <JourneySection />
      <PortfolioBlog />
      <PortfolioContact />
    </>
  );
}
