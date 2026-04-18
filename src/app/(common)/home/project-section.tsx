'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard from './project-card';
import EmptyState from './enpty-state';
import CoustomTitle from '@/components/common-component/couston-title';
import type { Project } from '@/type/front/project-data-type';

// Project data structure

const tabStyle =
  'relative data-[state=active]:text-primary text-white/60 rounded-lg py-3 transition-all duration-300 hover:text-white/80';

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description:
      'Modern personal portfolio with responsive layout, animations, and project showcase.',
    category: 'small',
    image: '/images/project/project-1.png',
    clientLink: 'https://example.com/portfolio',
    serverLink: 'https://github.com/example/portfolio',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: '2',
    title: 'Business Dashboard',
    description:
      'Admin dashboard with analytics widgets, role-based modules, and clean UI components.',
    category: 'medium',
    image: '/images/project/project-2.png',
    clientLink: 'https://example.com/dashboard',
    serverLink: 'https://github.com/example/dashboard',
    tags: ['React', 'TanStack Query', 'Shadcn UI'],
  },
  {
    id: '3',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce platform with products, cart, checkout and order tracking.',
    category: 'large',
    image: '/images/project/ecommerce-home.png',
    clientLink: 'https://example.com/shop',
    serverLink: 'https://github.com/example/ecommerce',
    tags: ['Next.js', 'MongoDB', 'Stripe'],
  },
];

const ProjectSection = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'small' | 'medium' | 'large'
  >('all');

  const filteredProjects =
    activeTab === 'all'
      ? projectsData
      : projectsData.filter((project) => project.category === activeTab);

  const tabVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section
      id="projects"
      className="scroll-mt-24 min-h-screen py-20 px-4 md:px-8 lg:px-16"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Featured <CoustomTitle title=" Projects" />
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions across different
            scales and complexities
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as 'all' | 'small' | 'medium' | 'large')
          }
          className="w-full"
        >
          {/* Tabs List */}
          <TabsList
            className="relative grid w-full max-w-lg mx-auto grid-cols-4 mb-12 bg-white/10 backdrop-blur-lg border border-white/20 p-1 rounded-xl h-auto"
            aria-label="Project size categories"
          >
            <TabsTrigger value="all" className={tabStyle}>
              {activeTab === 'all' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/20 rounded-lg shadow-lg"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">All</span>
            </TabsTrigger>
            <TabsTrigger value="small" className={tabStyle}>
              {activeTab === 'small' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/20 rounded-lg shadow-lg"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">Small</span>
            </TabsTrigger>
            <TabsTrigger value="medium" className={tabStyle}>
              {activeTab === 'medium' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/20 rounded-lg shadow-lg"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">Medium</span>
            </TabsTrigger>
            <TabsTrigger value="large" className={tabStyle}>
              {activeTab === 'large' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/20 rounded-lg shadow-lg"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">Large</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          {(['all', 'small', 'medium', 'large'] as const).map((category) => (
            <TabsContent
              key={category}
              value={category}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {filteredProjects.length > 0 ? (
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          variants={cardVariants}
                          custom={index}
                        >
                          <ProjectCard project={project} />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <EmptyState
                        category={
                          category === 'all'
                            ? 'All'
                            : category.charAt(0).toUpperCase() +
                              category.slice(1)
                        }
                      />
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProjectSection;
