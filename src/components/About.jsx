import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black w-full py-12 pl-15 sm:pr-0'>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Professional Skills</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">React.js</h3>
            <p className="text-gray-300 mb-2">Building dynamic user interfaces with reusable components and hooks.</p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
              <li>Flex Academic Portal – Created academic portal using C# .NET ASP Core and SQL database</li>
              <li>Job Fair Management – Created a Job Fair Management using MERN.</li>
              <li>Event Management – Created an Event Management using MERN</li>
            </ul>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-2">Node.js & Express</h3>
            <p className="text-gray-300">Creating fast and scalable backend APIs with RESTful architecture.</p>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">MySQL</h3>
            <p className="text-gray-300">Designing and managing relational databases for web applications.</p>
          </motion.div>
          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-pink-400 mb-2">Tailwind CSS</h3>
            <p className="text-gray-300">Crafting beautiful, responsive designs using utility-first classes.</p>
          </motion.div>
          {/* Card 5 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-2">Git & GitHub</h3>
            <p className="text-gray-300">Version control and team collaboration with Git best practices.</p>
          </motion.div>
          {/* Card 6 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-red-400 mb-2">Problem Solving</h3>
            <p className="text-gray-300">Strong ability to debug, optimize code, and solve real-world problems.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About