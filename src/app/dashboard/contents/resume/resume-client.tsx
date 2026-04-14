'use client';

import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
const TemplateOne = dynamic(() => import('./template-one'), {
  ssr: false,
});

const TemplateTwo = dynamic(() => import('./template-two'), {
  ssr: false,
});

const ResumePageClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const templete = searchParams.get('templete') || 'one';

  // Sync tab change with URL
  const handleTabChange = (value: string) => {
    router.push(`?templete=${value}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Resume</h1>

      <Tabs className="" value={templete} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="one">Template One</TabsTrigger>
          <TabsTrigger value="two">Template Two</TabsTrigger>
        </TabsList>

        <TabsContent value="one">
          <TemplateOne />
        </TabsContent>

        <TabsContent value="two">
          <TemplateTwo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumePageClient;
