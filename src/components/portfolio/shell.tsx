import type { ReactNode } from 'react';
import PortfolioNavigation from './navigation';
import { PortfolioMotion } from './motion';
import { Brand } from './brand';
import { ArrowUp } from 'lucide-react';
import InteractiveGridBackground from './interactive-grid-background';

export function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <div className="portfolio" id="top">
      <InteractiveGridBackground />
      <PortfolioMotion>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <PortfolioNavigation />
        {children}
        <footer className="portfolio-footer">
          <div className="portfolio-container footer-inner">
            <Brand />
            <p>
              © {new Date().getFullYear()} Rajiul Islam. All rights reserved.
            </p>
            <a href="#top" className="footer-top">
              Back to top <ArrowUp size={14} />
            </a>
          </div>
        </footer>
      </PortfolioMotion>
    </div>
  );
}
