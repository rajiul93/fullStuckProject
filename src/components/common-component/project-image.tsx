'use client';

import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import { useState } from 'react';

export default function ProjectImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);
  return (
    <div className={`project-thumbnail ${className}`}>
      {error || !src ? (
        <div className="project-image-error">
          <ImageOff size={22} aria-hidden="true" />
          <p>Image not available</p>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="project-image"
          unoptimized={src.startsWith('https://') || src.startsWith('http://')}
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
