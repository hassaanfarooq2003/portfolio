import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Exp.' },
  { id: 'contact', label: 'Contact' },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'about';
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen w-12 sm:w-16 bg-black flex flex-col items-center py-2 sm:py-4 fixed left-0 top-5 z-20">
      <div className="flex flex-col items-center space-y-4 sm:space-y-8">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`relative text-xs sm:text-sm rotate-[-90deg] py-2 px-2 transition-all
              ${activeSection === section.id ? 'text-green-400 font-bold border-l-4 border-green-400 bg-gray-800' : 'text-gray-400'}`}
            style={{ minWidth: '60px', textAlign: 'center' }}
          >
            {section.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;