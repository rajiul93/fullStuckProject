import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ProjectImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-t-xl group-hover:rounded-t-2xl transition-all duration-300">
      {loading && (
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center">
          <p className="text-white/60">Image not available 😞</p>
          <br />
          <p>size ratio is height 256px </p>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ProjectImage;
