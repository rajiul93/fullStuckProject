'use client';
import { Badge } from '@/components/ui/badge';
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

  const education = [
    {
      initial: 'B',
      bgColor: 'bg-cyan-500',
      title: 'B.Sc in Electrical & Electronic Engineering (EEE)',
      institution: 'World University of Bangladesh (WUB)',
      year: '2018 - 2022',
      badges: ['B.Sc', 'EEE', '2018-2022'],
    },
    {
      initial: 'D',
      bgColor: 'bg-blue-600',
      title: 'Diploma in Electrical',
      institution: 'Mangrove Institute of Science and Technology (MIST), Khulna',
      year: '2013 - 2017',
      badges: ['Diploma', '2013-2017', 'Khulna'],
    },
    {
      initial: 'PH',
      bgColor: 'bg-purple-500',
      title: 'Programming Hero — Web Development',
      institution: 'Programming Hero',
      year: 'Extra Training',
      badges: ['Training', 'Frontend', 'MERN'],
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

        {/* Education Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">EDUCATION</h2>
          <div className="space-y-6">
            {education.map((item, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold text-xs">
                        {item.initial}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2 text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-2">
                        {item.institution}
                      </p>
                      <p className="text-xs text-white/70 mb-3">
                        {item.year}
                      </p>
                      <div className="flex gap-2">
                        {item.badges.map((badge, badgeIndex) => (
                          <Badge
                            key={badgeIndex}
                            variant="secondary"
                            className={`bg-white/20 cursor-pointer text-white border-white/30 transition-colors duration-300 ${
                              item.bgColor === 'bg-cyan-500'
                                ? 'hover:bg-cyan-500/80'
                                : item.bgColor === 'bg-blue-600'
                                  ? 'hover:bg-blue-600/80'
                                  : item.bgColor === 'bg-purple-500'
                                    ? 'hover:bg-purple-500/80'
                                    : 'hover:bg-gray-500/80'
                            }`}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
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
