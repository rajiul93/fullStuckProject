'use client';
import { Button } from '@/components/ui/button';
import { HardDriveDownload } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import { toast } from 'sonner';

const Resume = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const { TemplateOneDocument, resumeData } = await import(
        '@/app/(common)/resume/template-one'
      );
      const blob = await pdf(<TemplateOneDocument data={resumeData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personal.name || 'resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Failed to download resume');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="default"
        onClick={handleDownload}
        disabled={isDownloading}
        className="rounded-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors text-white px-4 py-2 shadow-sm"
      >
        <HardDriveDownload />
        {isDownloading ? 'Downloading...' : 'Resume'}
      </Button>
    </div>
  );
};

export default Resume;
