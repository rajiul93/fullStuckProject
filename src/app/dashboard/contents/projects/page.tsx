import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ProjectsPage = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-primary">Projects</h1>
        <Link href="/dashboard/contents/projects/create">
          <Button>
            <Plus /> Add new project
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectsPage;
