'use client';
import { Button } from '@/components/ui/button';
import { HardDriveDownload } from 'lucide-react';

const Resume = () => {
  return (
    <div className="flex items-center justify-center">
      <a href="/resume.pdf" download aria-label="Download resume">
        <Button
          variant="default"
          className="rounded-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors text-white px-4 py-2 shadow-sm"
        >
          <HardDriveDownload /> Resume
        </Button>
      </a>
    </div>
  );
};

export default Resume;
