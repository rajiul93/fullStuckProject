import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const SkillsSection = () => {
  const skills = [
    {
      icon: '📱',
      bgColor: 'bg-yellow-500',
      title: 'React Native',
      description: 'React, Next.js, Tailwind, Animation',
    },
    {
      icon: '⚛️',
      bgColor: 'bg-blue-500',
      title: 'Next.js & React',
      description: 'Components, Hooks, State Management',
    },
    {
      icon: '🎨',
      bgColor: 'bg-purple-500',
      title: 'Mongoose',
      description: 'Modern UI Design & Smooth Animation',
    },
    {
      icon: '💖',
      bgColor: 'bg-pink-500',
      title: 'Express & Node.js',
      description: 'MERN Stack & Modern Web Technologies',
    },
  ];

  const projects = [
    {
      initial: 'R',
      bgColor: 'bg-blue-500',
      title: 'Project XL',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod',
      badges: ['React', 'Node.js'],
      showButton: false,
    },
    {
      initial: 'E',
      bgColor: 'bg-green-500',
      title: 'Ecommerce App',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod',
      badges: ['Next.js', 'MongoDB'],
      showButton: false,
    },
    {
      initial: 'S',
      bgColor: 'bg-purple-500',
      title: 'Streaming App',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod',
      badges: ['Socket.io', 'Express'],
      showButton: true,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-8">SKILLS</h2>
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${skill.bgColor} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="font-bold mb-2 text-white">{skill.title}</h3>
                  <p className="text-sm text-gray-300">{skill.description}</p>
                </CardContent>
              </Card>
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
