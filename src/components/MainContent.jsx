import React from 'react';

const MainContent = () => {
  return (
    <main className="min-h-screen w-full flex items-center pt-20 bg-black ml-12 sm:ml-16">
      <div className="flex-1 flex flex-col justify-center px-2 sm:px-0">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 sm:mb-4">
          Hey, I'm Hassaan
          <span className="text-green-400">.</span>
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-light text-white mb-4 sm:mb-6">
          A passionate <span className="font-bold text-green-400">MERN Stack Developer</span> with interests in <span className="font-bold text-green-400">DevOps</span> and <span className="font-bold text-green-400">Cloud Computing</span>.
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">
          I'm a recent graduate from <span className="text-white font-semibold">FAST NUCES</span>, eager to contribute to impactful tech solutions. I specialize in building full-stack web applications using the MERN stack, and I’m continuously exploring the world of DevOps and Cloud technologies.
        </p>
        <button className="bg-green-400 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-green-500 transition-colors">
          Contact Me
        </button>
      </div>

      {/* Dot grid decorative element */}
      <div className="hidden md:block ml-16">
        <div className="grid grid-cols-12 gap-3">
          {Array.from({ length: 12 * 16 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-700 rounded-full" style={{ opacity: 0.5 }} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
