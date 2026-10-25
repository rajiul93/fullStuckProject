import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="portfolio-eyebrow">
      {children}
      <span aria-hidden="true" />
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  id: string;
  children?: ReactNode;
}) {
  return (
    <div className="portfolio-section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
