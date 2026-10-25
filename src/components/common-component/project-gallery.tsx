'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectImage from './project-image';

export default function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const index = Math.min(active, Math.max(images.length - 1, 0));
  function move(direction: number) {
    setActive((index + direction + images.length) % images.length);
  }
  // Auto-advance; the timer restarts whenever the slide changes so manual navigation gets a full interval.
  useEffect(() => {
    if (paused || images.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(
      () => setActive((index + 1) % images.length),
      4500,
    );
    return () => clearTimeout(timer);
  }, [index, paused, images.length]);
  return (
    <div
      className="project-gallery relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} images`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart !== null && images.length > 1) {
          const delta = event.changedTouches[0].clientX - touchStart;
          if (Math.abs(delta) > 50) move(delta > 0 ? -1 : 1);
        }
        setTouchStart(null);
      }}
    >
      {images.map((src, slide) => (
        <ProjectImage
          key={`${slide}-${src}`}
          src={src || ''}
          alt={`${title} — image ${slide + 1}`}
          className={`gallery-slide ${slide === index ? 'is-active' : ''}`}
        />
      ))}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous image"
            className="gallery-control gallery-previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next image"
            className="gallery-control gallery-next"
          >
            <ChevronRight size={20} />
          </button>
          <div className="gallery-dots">
            {images.map((_, dot) => (
              <button
                type="button"
                key={dot}
                onClick={() => setActive(dot)}
                aria-label={`Show image ${dot + 1}`}
                aria-pressed={dot === index}
                className="gallery-dot"
              >
                <span
                  className={`h-2 w-2 rounded-full ${dot === index ? 'gallery-dot-active' : ''}`}
                />
              </button>
            ))}
          </div>
          <span
            className="absolute right-3 top-3 rounded bg-slate-950/80 px-2 py-1 text-xs text-white"
            aria-live="polite"
          >
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}
