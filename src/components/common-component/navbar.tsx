'use client';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Resume from './resume/resume';
import { AlignVerticalSpaceAround } from 'lucide-react';
import {
  LANDING_NAV_TARGETS,
  LANDING_SCROLL_OFFSET,
} from '@/app/(common)/home/landing-nav-config';

const navLinkClass =
  'cursor-pointer hover:text-blue-300 transition-colors text-inherit';

function NavEntry({
  to,
  label,
  onNavigate,
}: {
  to: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    const scrollToSection = () => {
      const section = document.getElementById(to);
      if (!section) return;

      const top =
        section.getBoundingClientRect().top +
        window.scrollY +
        LANDING_SCROLL_OFFSET;

      window.scrollTo({ top, behavior: 'smooth' });
    };

    const handleScrollToSection = () => {
      // Mobile menu close first; then compute offset after layout settles.
      if (onNavigate) {
        onNavigate();
        window.setTimeout(scrollToSection, 260);
        return;
      }

      scrollToSection();
    };

    return (
      <button
        type="button"
        className={navLinkClass}
        onClick={handleScrollToSection}
      >
        {label}
      </button>
    );
  }

  return (
    <Link
      href={`/#${to}`}
      className={navLinkClass}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/10 backdrop-blur-md supports-[backdrop-filter]:bg-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center rounded-lg overflow-hidden gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Rajiul Islam logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {LANDING_NAV_TARGETS.map((item) => (
            <NavEntry key={item.to} to={item.to} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Resume />
          <Button
            variant="ghost"
            size="lg"
            className="md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <AlignVerticalSpaceAround className="w-10" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            className="md:hidden border-t border-white/10 bg-white/10 backdrop-blur-md overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <motion.div
              className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 text-sm font-medium"
              initial={{ y: -6 }}
              animate={{ y: 0 }}
              exit={{ y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {LANDING_NAV_TARGETS.map((item) => (
                <NavEntry
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  onNavigate={() => setIsMenuOpen(false)}
                />
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
