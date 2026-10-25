'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brand } from './brand';

const links = [
  { label: 'Work', id: 'selected-work' },
  { label: 'About', id: 'about' },
  { label: 'Writing', id: 'blog' },
  { label: 'Contact', id: 'contact' },
];
export default function PortfolioNavigation() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const marker = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const headerObserver = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    if (marker.current) headerObserver.observe(marker.current);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0])
          setActive(
            visible[0].target.id === 'projects'
              ? 'selected-work'
              : visible[0].target.id === 'experience'
                ? 'about'
                : visible[0].target.id,
          );
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.1, 0.3] },
    );
    [
      'home',
      'selected-work',
      'projects',
      'about',
      'experience',
      'blog',
      'contact',
    ].forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    return () => {
      headerObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!(event.target as HTMLElement).closest('.portfolio-header'))
        setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    const media = window.matchMedia('(min-width: 768px)');
    const onDesktop = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', onDesktop);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      media.removeEventListener('change', onDesktop);
    };
  }, [open]);
  function navigate(id: string) {
    setActive(id);
    setOpen(false);
  }
  const href = (id: string) => (pathname === '/' ? `#${id}` : `/#${id}`);
  return (
    <>
      <div ref={marker} className="nav-sentinel" aria-hidden="true" />
      <header className={`portfolio-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="portfolio-container nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.id}
                href={href(link.id)}
                onClick={() => navigate(link.id)}
                aria-current={active === link.id ? 'location' : undefined}
                className="nav-link"
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="nav-indicator"
                    transition={{ duration: reduced ? 0 : 0.25 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <Link
              href={href('contact')}
              className="portfolio-button button-outline button-small"
            >
              Let&apos;s talk <ArrowRight size={15} />
            </Link>
            <button
              ref={menuButton}
              type="button"
              className="mobile-menu-toggle"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="mobile-navigation"
              initial={{ opacity: 0, y: reduced ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0 : 0.22 }}
            >
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={href(link.id)}
                  onClick={() => navigate(link.id)}
                  aria-current={active === link.id ? 'location' : undefined}
                >
                  {link.label}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
