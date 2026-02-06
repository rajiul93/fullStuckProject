import { motion } from 'framer-motion';
import { Server } from 'lucide-react';

const EmptyState = ({ category }: { category: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center"
  >
    <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center mb-4">
      <Server className="w-10 h-10 text-white/40" />
    </div>
    <h3 className="text-xl font-semibold text-white/80 mb-2">
      No {category} Projects Yet
    </h3>
    <p className="text-white/60 max-w-md">
      We&apos;re currently working on {category.toLowerCase()} projects. Check
      back soon for updates!
    </p>
  </motion.div>
);
export default EmptyState;
