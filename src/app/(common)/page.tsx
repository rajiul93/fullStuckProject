import type { Metadata } from 'next';
import LandingPage from './home/landing-page';
import { db } from '@/lib/server/db';
import {
  serializeProject,
  withImages,
  projectOrder,
} from '@/lib/server/projects';
import { resumeData } from './resume/resume-data';
import { site, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: site.title },
  alternates: { canonical: '/' },
};

// Person + WebSite structured data so Google can show the name, role and profiles.
function structuredData() {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${url}/#person`,
        name: site.name,
        url,
        image: `${url}/images/rajiul-hero.jpg`,
        jobTitle: site.role,
        description: site.description,
        email: `mailto:${resumeData.contact.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Khulna',
          addressCountry: 'BD',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'World University of Bangladesh',
        },
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Tailwind CSS',
          'Node.js',
          'Express.js',
          'MongoDB',
          'REST APIs',
          'Front-end development',
        ],
        sameAs: site.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: site.name,
        description: site.description,
        publisher: { '@id': `${url}/#person` },
        inLanguage: 'en',
      },
    ],
  };
}

export const dynamic = 'force-dynamic';
async function loadProjects() {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      orderBy: projectOrder,
      include: withImages,
    });
    return projects.map(serializeProject);
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const projects = await loadProjects();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData()).replace(/</g, '\\u003c'),
        }}
      />
      {projects ? (
        <LandingPage projects={projects} />
      ) : (
        <LandingPage error />
      )}
    </>
  );
}
