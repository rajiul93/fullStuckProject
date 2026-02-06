'use client';
import { motion } from 'framer-motion';
interface CoustomTitleProps {
  title: string;
}

const CoustomTitle = ({ title }: CoustomTitleProps) => {
  return (
    <motion.span
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-purple-400 to-white bg-clip-text text-transparent"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {title}
    </motion.span>
  );
};

export default CoustomTitle;
