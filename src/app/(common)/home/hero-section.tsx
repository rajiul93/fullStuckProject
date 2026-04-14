'use client';
import CustomButton from '@/components/common-component/coustom-button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import React from 'react';
import { SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si';
import { motion } from 'framer-motion';
import CoustomTitle from '@/components/common-component/couston-title';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
    >
      <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-1 lg:order-1 ">
        <CoustomTitle title="MERN STACK DEVELOPER" />
        <p className="text-sm sm:text-lg text-gray-300 max-w-lg mx-auto lg:mx-0 ">
          Passionate and detail-oriented Frontend Developer with 1 year of
          experience building responsive and user-friendly web applications.
          Skilled in translating design mockups into high-quality code using
          modern frontend technologies. Adept at collaborating with
          cross-functional teams to deliver high-performance digital
          experiences.
        </p>

        <div className="flex justify-center lg:justify-start">
          <CustomButton title=" MY WORK" className="text-sm h-12 " />
        </div>

        {/* Tech Stack */}
        <motion.div
          className="flex flex-wrap gap-2 pt-4 sm:pt-8 justify-center lg:justify-start"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.1,
          }}
        >
          {[
            'JS',
            'REACT',
            'NEXT.JS',
            'EXPRESS',
            'MONGOOSE',
            'MONGODB',
            'SOCKET',
            'MOTION',
            'FIGMA',
            'UI/UX',
            'TAILWIND',
            'JAVASCRIPT',
            'GIT',
          ].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
            >
              <Badge variant="secondary" className="cursor-pointer">
                {tech}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Hero Illustration */}
      <div className="relative order-2 lg:order-2">
        <div className="relative w-full h-80 sm:h-96 lg:h-96 flex items-center justify-center">
          {/* Floating Icons with Glass Effect */}

          {/* Main Developer Illustration */}
          <div className="relative z-10">
            {/* Desk with Glass Effect */}
            <div className="mt-3 sm:mt-4 w-48 sm:w-72 h-64 sm:h-80 lg:h-96 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg relative shadow-xl mx-auto">
              {/* Mongoose - Top Right */}
              <div className="absolute top-4 sm:top-10 -right-4 sm:-right-10 w-16 sm:w-20 h-10 sm:h-12 bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden rounded-xl flex items-center justify-center animate-bounce shadow-xl">
                <Image
                  src="/images/mongoose.png"
                  alt="Mongoose Icon"
                  width={80}
                  height={48}
                  className="object-contain"
                />
              </div>

              {/* React - Top Left */}
              <div
                className="absolute top-4 sm:top-10 -left-4 sm:-left-10 w-16 sm:w-20 h-10 sm:h-12 bg-blue-500/80 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center animate-bounce shadow-xl"
                style={{ animationDelay: '0.5s' }}
              >
                <span className="text-white">
                  <SiReact size={20} className="sm:w-7 sm:h-7" />
                </span>
              </div>

              {/* Next.js - Right */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-5 w-8 sm:w-10 h-8 sm:h-10 bg-black/80 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                <span className="text-white">
                  <SiNextdotjs size={20} className="sm:w-7 sm:h-7" />
                </span>
              </div>

              {/* TypeScript - Left */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -left-5 w-8 sm:w-10 h-8 sm:h-10 bg-blue-600/80 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center animate-pulse shadow-xl"
                style={{ animationDelay: '1s' }}
              >
                <span className="text-white">
                  <SiTypescript size={20} className="sm:w-7 sm:h-7" />
                </span>
              </div>

              {/* Zustand - Bottom Right */}
              <div
                className="absolute bottom-4 sm:bottom-10 -right-4 sm:-right-10 w-16 sm:w-20 h-10 sm:h-12 bg-orange-500/80 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center animate-bounce shadow-xl"
                style={{ animationDelay: '0.3s' }}
              >
                <span className="text-white text-xs sm:text-sm font-bold">
                  🐻
                </span>
              </div>

              {/* TanStack Query - Bottom Left */}
              <div
                className="absolute bottom-4 sm:bottom-10 -left-4 sm:-left-10 w-16 sm:w-20 h-10 sm:h-12 bg-red-500/80 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center animate-bounce shadow-xl"
                style={{ animationDelay: '0.8s' }}
              >
                <span className="text-white text-xs sm:text-sm font-bold">
                  TQ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
