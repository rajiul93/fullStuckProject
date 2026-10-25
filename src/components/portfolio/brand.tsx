import Link from 'next/link';

export function Brand() {
  return (
    <Link
      href="/#home"
      className="portfolio-brand"
      aria-label="Rajiul Islam — home"
    >
      <span className="brand-mark" aria-hidden="true">
        R<span>.</span>
      </span>
      <span className="brand-name">RAJIUL</span>
    </Link>
  );
}
