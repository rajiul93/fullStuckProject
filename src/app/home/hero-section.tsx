import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { SiNextdotjs } from 'react-icons/si';
const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ">
      <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          MERN STUCK DEVELOPER
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0">
          Building the Future, One Line of Code at Time.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-500/80 to-purple-500/80 hover:from-cyan-500 hover:to-purple-500 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg transition-all duration-300 shadow-xl"
        >
          VIEW MY WORK
        </Button>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-4 sm:pt-8 justify-center lg:justify-start">
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
          ].map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-xs sm:text-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Hero Illustration */}
      <div className="relative order-1 lg:order-2">
        <div className="relative w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center">
          {/* Floating Icons with Glass Effect */}
          <div className="absolute top-4 sm:top-10 right-4 sm:right-10 w-16 sm:w-20 h-10 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden rounded-xl flex items-center justify-center animate-bounce shadow-xl">
            <Image
              src="/images/mongoose.png"
              alt="Mongoose Icon"
              width={80}
              height={48}
              className="object-contain"
            />
          </div>
          <div className="absolute top-12 sm:top-20 left-4 sm:left-10 w-8 sm:w-10 h-8 sm:h-10 bg-green-500/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center animate-pulse shadow-xl">
            <span className="text-white">
              <SiNextdotjs size={20} className="sm:w-7 sm:h-7" />
            </span>
          </div>
          <div className="absolute bottom-18 sm:bottom-20 right-12 sm:right-20 w-10 sm:w-14 h-10 sm:h-14 bg-purple-500/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center animate-pulse shadow-xl">
            <span className="text-white text-xl sm:text-3xl">⚛️</span>
          </div>

          {/* Main Developer Illustration */}
          <div className="relative z-10">
            <div className="w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-blue-400/80 to-purple-500/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-24 sm:w-32 h-24 sm:h-32 overflow-hidden bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Image
                  src="/images/rajiul.jpeg"
                  alt="Developer Illustration"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>
            {/* Desk with Glass Effect */}
            <div className="mt-3 sm:mt-4 w-48 sm:w-64 h-12 sm:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg relative shadow-xl mx-auto">
              <div className="absolute top-2 left-3 sm:left-4 w-8 sm:w-12 h-4 sm:h-8 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded shadow-md"></div>
              <div className="absolute top-2 right-3 sm:right-4 w-6 sm:w-8 h-4 sm:h-8 bg-blue-600/80 backdrop-blur-sm border border-blue-400/50 rounded shadow-md"></div>
              {/* Additional decorative elements */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-white/20 rounded-full"></div>
            </div>
          </div>

          {/* Background decorative circles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-pink-400/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
