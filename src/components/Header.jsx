import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 10) {
        setShowHeader(true);
        lastScrollY.current = window.scrollY;
        return;
      }
      if (window.scrollY < lastScrollY.current) {
        setShowHeader(true);
      } else if (window.scrollY > lastScrollY.current) {
        setShowHeader(false);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className={`fixed left-16 top-0 right-0 h-20 flex items-center justify-between px-2 sm:px-8 bg-transparent z-10 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'} gap-x-2 sm:gap-x-4`}
    >
      <button className="border border-green-400 text-green-400 px-2 py-1 sm:px-4 sm:py-1 rounded-lg text-sm sm:text-base font-medium hover:bg-green-400 hover:text-black transition-colors">
        My resume
      </button>
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-nowrap">
        <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gray-700 rounded" />
        <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gray-700 rounded" />
        <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gray-700 rounded" />
        <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gray-700 rounded" />
      </div>
    </motion.header>
  );
};

export default Header;