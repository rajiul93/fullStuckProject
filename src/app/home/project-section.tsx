'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard from './project-card';
import { projectsData } from '@/hooks/api/useProjectData';
import EmptyState from './enpty-state';
import CoustomTitle from '@/components/common-component/couston-title';

// Project data structure

const tabStyle =
  'relative data-[state=active]:text-primary text-white/60 rounded-lg py-3 transition-all duration-300 hover:text-white/80';

const ProjectSection = () => {
  const [activeTab, setActiveTab] = useState<'small' | 'medium' | 'large'>(
    'medium',
  );

  const filteredProjects = projectsData.filter(
    (project) => project.category === activeTab,
  );

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  return (
    <section
      className="min-h-screen py-20 px-4 md:px-8 lg:px-16"
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
            setActiveTab(value as 'small' | 'medium' | 'large')
          }
          className="w-full"
        >
          {/* Tabs List */}
          <TabsList
            className="relative grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-white/10 backdrop-blur-lg border border-white/20 p-1 rounded-xl h-auto"
            aria-label="Project size categories"
          >
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
          {(['small', 'medium', 'large'] as const).map((category) => (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      category={
                        category.charAt(0).toUpperCase() + category.slice(1)
                      }
                    />
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
