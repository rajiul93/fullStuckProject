import { PortfolioShell } from '@/components/portfolio/shell';
import PortfolioContact from '@/components/portfolio/contact';
export default function ContactPage() {
  return (
    <PortfolioShell>
      <main id="main-content" className="portfolio-contact-page">
        <PortfolioContact />
      </main>
    </PortfolioShell>
  );
}
