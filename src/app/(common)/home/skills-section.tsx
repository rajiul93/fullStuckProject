'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SkillCard from './skills-card';
import { TSkill } from '@/type/front/skills-type';

const SkillsSection = () => {
  const skills: TSkill[] = [
    {
      imageUrl: '/images/react.png',
      title: 'React.js',
      description: 'React, Next.js, Tailwind, Animation',
    },
    {
      imageUrl: '/images/nextjs.png',
      title: 'Next.js',
      description: 'Components, Hooks, State Management',
    },
    {
      imageUrl: '/images/mongoose.png',
      title: 'Mongoose',
      description: 'Modern UI Design & Smooth Animation',
    },
    {
      imageUrl: '/images/express.png',
      title: 'Express & Node.js',
      description: 'MERN Stack & Modern Web Technologies',
    },
  ];

  const projects = [
    {
      initial: 'R',
      bgColor: 'bg-blue-500',
      title: 'Multi-tenant Architecture',
      description:
        'A powerful multi-tenant SaaS platform that enables users to build and manage eCommerce, portfolio, business, and OTA solutions from a single unified dashboard—without relying on pre-built templates. Each tenant can create and customize their own dashboard experience with flexible layouts and modular features, designed for scalability and modern performance.',
      badges: ['React', 'Node.js'],
      showButton: false,
    },
    // {
    //   initial: 'E',
    //   bgColor: 'bg-green-500',
    //   title: 'Ecommerce App',
    //   description:
    //     'A powerful all-in-one eCommerce solution with no limitations—fully customizable layouts, dynamic content management, POS, tax, revenue tracking, and everything you need to run and grow your online business.',
    //   badges: ['Next.js', 'MongoDB'],
    //   showButton: false,
    // },
    {
      initial: 'S',
      bgColor: 'bg-purple-500',
      title: 'A complete OTA (Online Travel Agency)',
      description:
        'A complete OTA (Online Travel Agency) management system designed to handle the full travel booking workflow. Users can search flights, book or hold tickets, and manage balance through multiple top-up methods including bank, cheque, and online payments—all from a simple and user-friendly dashboard. The platform supports both individual users and agencies. Agencies can create their own teams, assign roles, and manage operations based on their business needs. On the admin side, the system provides full control including flight creation, provider selection, multi-currency management, user and agency management, and additional services like vouchers, visas, tours, airport and airline management, and group ticket handling—everything required to run a complete travel business in one place.',
      badges: ['Socket.io', 'Express'],
      showButton: true,
    },
  ];

  return (
    <section
      id="skills"
      className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16"
      aria-labelledby="skills-heading"
    >
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 id="skills-heading" className="text-3xl font-bold mb-8">
            SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">PROJECTS</h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 ${project.bgColor} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold">
                        {project.initial}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2 text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-3">
                        {project.description}
                      </p>
                      <div className="flex gap-2">
                        {project.badges.map((badge, badgeIndex) => (
                          <Badge
                            key={badgeIndex}
                            variant="secondary"
                            className={`bg-white/20 cursor-pointer text-white border-white/30 transition-colors duration-300 ${
                              project.bgColor === 'bg-blue-500'
                                ? 'hover:bg-blue-500/80'
                                : project.bgColor === 'bg-green-500'
                                  ? 'hover:bg-green-500/80'
                                  : project.bgColor === 'bg-purple-500'
                                    ? 'hover:bg-purple-500/80'
                                    : 'hover:bg-gray-500/80'
                            }`}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      {project.showButton && (
                        <Button
                          size="sm"
                          className="mt-3 bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 backdrop-blur-sm border border-white/20 transition-all duration-300"
                        >
                          View Project
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
