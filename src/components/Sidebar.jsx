import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-screen w-12 sm:w-16 bg-black flex flex-col items-center py-2 sm:py-4 fixed left-0 top-5"
    >
      {/* Logo Placeholder */}
      {/* Vertical Navigation */}
      <div className="flex flex-col items-center space-y-4 sm:space-y-8">
        <span className="text-white text-xs sm:text-sm rotate-[-90deg] py-2">About</span>
        <span className="text-gray-400 text-xs sm:text-sm rotate-[-90deg] py-2">Projects</span>
        <span className="text-gray-400 text-xs sm:text-sm rotate-[-90deg] py-2">Exp.</span>
        <span className="text-gray-400 text-xs sm:text-sm rotate-[-90deg] py-2">Contact</span>
      </div>
    </motion.div>
  );
};

export default Sidebar;