import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: "British American Tobacco – Intern at IT Department",
    role: "Intern",
    duration: "June 2024 - Aug 2024",
    description:
      "Worked with senior engineers and cross-functional teams to support IT projects, leading to a 30% improvement in network efficiency. Participated in a major network switch replacement, increasing network capacity by 50% and boosting data transfer speeds by 40%.",
  },
  {
    company: "Fast National University – Intern at UrduX by Dr Mehreen",
    role: "UX/UI Designer",
    duration: "July 2024 - Aug 2024",
    description:
      "Designed a fully responsive interface to optimize user experience across devices. Collaborated in weekly meetings to communicate ideas and deliver timely responses. Successfully deployed the website with smooth and error-free operation post-launch.",
  },
  {
    company: "Fast National University – Teacher’s Assistant for Computer Networks",
    role: "Teaching Assistant",
    duration: "Feb 2024 - June 2024",
    description:
      "Assisted the instructor in class activities and student support. Helped in grading assignments and preparing course materials for effective learning.",
  },
  {
    company: "Fast National University – Lab Demonstrator for Computer Networks",
    role: "Lab Demonstrator",
    duration: "Feb 2024 - June 2024",
    description:
      "Guided students in applying theoretical knowledge to practical programming tasks, including socket programming and Cisco tracer packets. Helped identify and resolve code issues during lab sessions to improve understanding.",
  },
];

const Experience = () => (
  <div className="max-w-3xl mx-auto py-12">
    <h2 className="text-3xl font-bold text-white mb-8 text-center">Experience</h2>
    <div className="relative border-l-2 border-green-400 pl-8">
      {experiences.map((exp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 relative"
        >
          <div className="absolute -left-8 top-6 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-400">{exp.company}</h3>
            <span className="text-sm text-gray-400">{exp.duration}</span>
            <div className="text-white font-medium">{exp.role}</div>
            <p className="text-gray-300 mt-2">{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Experience;
