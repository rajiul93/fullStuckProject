'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TSkill } from '@/type/front/skills-type';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const SkillCard = ({ skill }: { skill: TSkill }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
              {skill.imageUrl ? (
                <Image
                  width={64}
                  height={64}
                  alt={skill.title}
                  src={skill.imageUrl}
                  priority
                  quality={90}
                  sizes="64px"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-600">64*64</span>
              )}
            </div>
            <h3 className="font-bold mb-2 text-white">{skill.title}</h3>
            <p className="text-sm text-gray-300">{skill.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SkillCard;
