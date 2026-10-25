import { Eye, FilePenLine, FolderKanban, Images } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Project } from '@/type/front/project-data-type';
export function SectionCards({ projects }: { projects: Project[] }) {
  const cards = [
    {
      label: 'Total projects',
      value: projects.length,
      note: 'Your complete project collection',
      Icon: FolderKanban,
    },
    {
      label: 'Published',
      value: projects.filter((project) => project.published).length,
      note: 'Visible on your public portfolio',
      Icon: Eye,
    },
    {
      label: 'Drafts',
      value: projects.filter((project) => !project.published).length,
      note: 'Projects waiting to be published',
      Icon: FilePenLine,
    },
    {
      label: 'Project images',
      value: projects.reduce(
        (total, project) => total + (project.images?.length || 0),
        0,
      ),
      note: 'Images attached to your projects',
      Icon: Images,
    },
  ];
  return (
    <div className="admin-summary-grid">
      {cards.map(({ label, value, note, Icon }) => (
        <Card key={label} className="admin-summary-card">
          <CardHeader className="relative pb-3">
            <CardDescription className="text-xs">{label}</CardDescription>
            <CardTitle className="pt-1 text-3xl font-semibold tabular-nums">
              {value}
            </CardTitle>
            <span className="admin-summary-icon">
              <Icon size={17} strokeWidth={1.5} />
            </span>
          </CardHeader>
          <CardFooter className="pt-0 text-[10px] text-muted-foreground">
            {note}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
