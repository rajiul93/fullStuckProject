'use client';

import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { frontendCvData } from './frontend-cv-data';
import { fullstackCvData } from './fullstack-cv-data';

const TemplateFrontendCv = dynamic(() => import('./template-frontend-cv'), {
  ssr: false,
});

const TemplateMernCv = dynamic(() => import('./template-mern-cv'), {
  ssr: false,
});

const TemplateElectricalOne = dynamic(
  () => import('./resume-three-electrical'),
  {
    ssr: false,
  },
);

const templates = [
  'fullstack-cv',
  'frontend-cv',
  'mern-cv',
  'electrical',
] as const;

const ResumePageClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Old or unknown links (e.g. ?templete=one) fall back to the first template.
  const requested = searchParams.get('templete');
  const templete =
    templates.find((value) => value === requested) ?? templates[0];

  // UK/US/EU employers usually expect a CV without a photo: ?photo=off
  const showPhoto = searchParams.get('photo') !== 'off';

  // Sync tab change with URL
  const handleTabChange = (value: string) => {
    router.push(`?templete=${value}${showPhoto ? '' : '&photo=off'}`);
  };
  const togglePhoto = () => {
    router.push(`?templete=${templete}${showPhoto ? '&photo=off' : ''}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Resume</h1>

      <Tabs className="" value={templete} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="fullstack-cv">Full-Stack CV</TabsTrigger>
          <TabsTrigger value="frontend-cv">Frontend CV</TabsTrigger>
          <TabsTrigger value="mern-cv">MERN CV</TabsTrigger>
          <TabsTrigger value="electrical">Electrical</TabsTrigger>
        </TabsList>

        <TabsContent value="fullstack-cv">
          <label className="mb-4 flex w-fit cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showPhoto}
              onChange={togglePhoto}
              className="h-4 w-4"
            />
            Include photo
          </label>
          <TemplateFrontendCv
            data={
              showPhoto
                ? fullstackCvData
                : { ...fullstackCvData, profileImage: '' }
            }
          />
        </TabsContent>

        <TabsContent value="frontend-cv">
          <label className="mb-4 flex w-fit cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showPhoto}
              onChange={togglePhoto}
              className="h-4 w-4"
            />
            Include photo
          </label>
          <TemplateFrontendCv
            data={
              showPhoto
                ? frontendCvData
                : { ...frontendCvData, profileImage: '' }
            }
          />
        </TabsContent>

        <TabsContent value="mern-cv">
          <TemplateMernCv />
        </TabsContent>

        <TabsContent value="electrical">
          <TemplateElectricalOne />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumePageClient;
