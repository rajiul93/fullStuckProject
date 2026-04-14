/** Sticky header clearance for react-scroll (navbar ~64–72px + padding). */
export const LANDING_SCROLL_OFFSET = -88;

export const LANDING_NAV_TARGETS = [
  { label: 'HOME', to: 'home' },
  { label: 'Projects', to: 'projects' },
  { label: 'Blog', to: 'blog' },
  { label: 'Contact', to: 'contact' },
] as const;

export type LandingNavTarget = (typeof LANDING_NAV_TARGETS)[number];
