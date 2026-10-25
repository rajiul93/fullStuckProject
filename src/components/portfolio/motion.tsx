'use client';

import {
  MotionConfig,
  stagger,
  useAnimate,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, type ReactNode } from 'react';

export const entrance = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };
export const interaction = { duration: 0.25, ease: 'easeOut' as const };

export function PortfolioMotion({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={interaction}>
      {children}
    </MotionConfig>
  );
}

// The server renders visible content. Motion is progressive enhancement: no JS,
// observer support or animation library failure can leave a section hidden.
export function Reveal({
  children,
  className = '',
  group = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  group?: boolean;
  delay?: number;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, margin: '0px 0px -32px 0px' });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView || reduced) return;
    const target = group
      ? Array.from(
          scope.current.querySelectorAll<HTMLElement>('[data-reveal-item]'),
        )
      : [scope.current];
    if (!target.length) return;
    const restore = () =>
      target.forEach((element) => {
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
    try {
      const animation = animate(
        target,
        { opacity: [0, 1], y: [20, 0] },
        { ...entrance, delay: group ? stagger(0.08) : delay },
      );
      animation.then(restore).catch(restore);
      return () => {
        animation.stop();
        restore();
      };
    } catch {
      restore();
    }
  }, [inView, reduced, animate, group, delay, scope]);
  return (
    <div ref={scope} className={className} data-reveal>
      {children}
    </div>
  );
}
