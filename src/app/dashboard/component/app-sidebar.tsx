'use client';

import * as React from 'react';
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';
import { NavProjects } from './nav-projects';

// This is sample data.
const data = {
  user: {
    name: 'Azim Uddin',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Azim Uddin',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      items: [
        {
          title: 'History',
          url: '/dashboard/playground/history',
        },
        {
          title: 'Media',
          url: '/dashboard/playground/media',
        },
        {
          title: 'Settings',
          url: '/dashboard/playground/settings',
        },
      ],
    },
    {
      title: 'content',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Projects',
          url: '/dashboard/contents/projects',
        },
        {
          title: 'Blog',
          url: '/dashboard/contents/blog',
        },
        {
          title: 'Skills',
          url: '/dashboard/contents/skills',
        },
        {
          title: 'Educations',
          url: '/dashboard/contents/educations',
        },
        {
          title: 'Additional Trainings',
          url: '/dashboard/contents/additional-trainings',
        },
        {
          title: 'SoftSkill',
          url: '/dashboard/contents/soft-skill',
        },
        {
          title: 'Language',
          url: '/dashboard/contents/language',
        },
        {
          title: 'Certification',
          url: '/dashboard/contents/certification',
        },
        {
          title: 'Resume',
          url: '/dashboard/contents/resume',
        },
        {
          title: 'Resume Form',
          url: '/dashboard/contents/resume/form',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '/dashboard/settings/general',
        },
        {
          title: 'Team',
          url: '/dashboard/settings/team',
        },
        {
          title: 'Billing',
          url: '/dashboard/settings/billing',
        },
        {
          title: 'Limits',
          url: '/dashboard/settings/limits',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
  dashboard: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.dashboard} />
        <NavMain items={data.navMain} />
        <NavProjects title="Projects" projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
