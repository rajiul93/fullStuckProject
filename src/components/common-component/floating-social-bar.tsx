'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/mohammad.rajiulislam',
    icon: <FaFacebookF />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rajiul-islam-rayhan',
    icon: <FaLinkedinIn />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/rajiul93',
    icon: <FaGithub />,
  },
] as const;

export default function FloatingSocialBar() {
  return (
    <div className="fixed right-2 top-1/2 z-50 -translate-y-1/2 md:right-4">
      <div className="rounded-2xl border border-white/15 bg-white/10 p-1.5 md:p-2 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-2">
          {SOCIALS.map((s) => (
            <Button
              key={s.label}
              size="icon"
              variant="ghost"
              className="h-9 w-9 md:h-11 md:w-11 rounded-xl bg-white/5 text-white/85 border border-white/15 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30 hover:shadow-[0_14px_35px_rgba(34,211,238,0.18)] hover:-translate-y-0.5"
              aria-label={`${s.label} profile`}
              asChild
            >
              <Link href={s.href} target="_blank" rel="noopener noreferrer">
                <span className="text-base md:text-lg">{s.icon}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

