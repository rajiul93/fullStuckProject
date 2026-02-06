'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
interface CustomButtonProps {
  title: string;
  className?: string;
}

const CustomButton = ({ title, className }: CustomButtonProps) => {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }}
      style={{ transformOrigin: 'left' }}
    >
      <Button
        variant="outline"
        className={`text-cyan-400 w-fit border-cyan-400 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 ${className}`}
      >
        {title}
      </Button>
    </motion.div>
  );
};

export default CustomButton;
