'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; // added import

interface CustomButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

const CustomButton = ({ title, className, onClick }: CustomButtonProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }}
      style={{ transformOrigin: 'left' }}
      className={`relative inline-block p-0 bg-white/5 backdrop-blur-md border border-white/20 shadow-lg rounded-full overflow-hidden ${className ?? ''}`}
    >
      {/* SVG blob background with slight transparency + blur filter */}
      <svg
        viewBox="0 0 420 100"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-auto h-12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="blobGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#7C2BFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#5B21B6" stopOpacity="0.75" />
          </linearGradient>
          <filter id="softBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        <path
          d="M20 50 C40 10, 140 5, 260 12 C340 18, 400 22, 398 50 C396 78, 338 82, 260 88 C140 95, 40 90, 20 50 Z"
          fill="url(#blobGrad)"
          filter="url(#softBlur)"
        />
      </svg>

      {/* Text + arrow overlay */}
      <span className="absolute inset-0 flex items-center justify-center px-8 text-white font-semibold select-none pointer-events-none">
        <span className="mr-4">{title}</span>
        <span className="w-6 h-6 flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-white" strokeWidth={1.8} />
        </span>
      </span>
    </motion.button>
  );
};

export default CustomButton;
