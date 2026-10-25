import React from 'react';
import { PortfolioShell } from '@/components/portfolio/shell';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PortfolioShell>
      <main id="main-content">{children}</main>
    </PortfolioShell>
  );
};

export default PublicLayout;
