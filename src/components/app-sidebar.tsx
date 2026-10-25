'use client';
import type { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  FolderKanban,
  Settings2,
  ShieldCheck,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavUser } from '@/components/nav-user';

export function AppSidebar({
  email,
  ...props
}: ComponentProps<typeof Sidebar> & { email: string }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/admin">
                <span className="admin-logo">
                  R<span>.</span>
                </span>
                <div className="grid text-left">
                  <strong className="text-sm tracking-wide">RAJIUL</strong>
                  <span className="text-xs text-muted-foreground">
                    Portfolio workspace
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage your portfolio</SidebarGroupLabel>
          <SidebarMenu>
            {[
              { href: '/admin', label: 'Projects', Icon: FolderKanban },
              { href: '/admin/settings', label: 'Settings', Icon: Settings2 },
            ].map(({ href, label, Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild isActive={pathname === href}>
                  <Link
                    href={href}
                    onClick={() => setOpenMobile(false)}
                    aria-current={pathname === href ? 'page' : undefined}
                  >
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <div className="admin-sidebar-note">
            <ShieldCheck size={18} />
            <strong>Private workspace</strong>
            <p>Projects, images and cloud storage. All in one place.</p>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/" target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight />
                  <span>View site</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser email={email} />
      </SidebarFooter>
    </Sidebar>
  );
}
