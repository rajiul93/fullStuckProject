'use client';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Resume from './resume/resume';
import { AlignVerticalSpaceAround } from 'lucide-react';
// import Image from 'next/image';

const MENU = [
  { label: 'HOME', href: '/' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/10 backdrop-blur-md supports-[backdrop-filter]:bg-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {/* <div className="flex rounded-full  items-center justify-center  shadow-sm border border-white/20 bg-white/10 backdrop-blur-md p-1">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={42}
              height={42}
              className="rounded-full size-12 object-cover"
              priority={true}
            />
          </div> */}
          <span className="text-lg font-bold sm:text-2xl">RAJIUL ISLAM</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-blue-300 transition-colors"
            >
              {item.label}
            </Link>
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
              {MENU.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-blue-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
