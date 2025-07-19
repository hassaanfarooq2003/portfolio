import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black w-full py-12 pl-15 sm:pr-0'>
      <div className="max-w-6xl mx-auto px-4">
        {/* Professional Skills */}
        <h2 className="text-3xl font-bold text-center text-white mb-10">Professional Skills</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-auto mb-16">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">React.js</h3>
            <p className="text-gray-300 mb-2">
              Building dynamic user interfaces with reusable components and hooks.
            </p>
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
          {/* Card 7 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-orange-400 mb-2">DevOps</h3>
            <p className="text-gray-300">Implementing CI/CD pipelines, containerization with Docker, and orchestration with Kubernetes for scalable deployments.</p>
          </motion.div>
          {/* Card 8 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-md transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Cloud Computing</h3>
            <p className="text-gray-300">Deploying and managing applications on cloud platforms with focus on scalability, security, and cost optimization.</p>
          </motion.div>
        </div>

        {/* Projects Section */}
        <h2 className="text-3xl font-bold text-center text-white mb-10">Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mx-auto">
          {/* Flex Academic Portal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Flex Academic Portal</h3>
            <p className="text-gray-300 mb-2">
              Developed an academic management portal allowing students and faculty to manage courses, assignments, and grades efficiently. Built using C# .NET ASP Core and SQL database.
            </p>
            <span className="inline-block bg-blue-800 text-blue-100 px-2 py-1 rounded text-xs">C#</span>
            <span className="inline-block bg-gray-800 text-gray-100 px-2 py-1 rounded text-xs ml-2">.NET Core</span>
            <span className="inline-block bg-yellow-800 text-yellow-100 px-2 py-1 rounded text-xs ml-2">SQL</span>
          </motion.div>

          {/* Job Fair Management */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-2">Job Fair Management System</h3>
            <p className="text-gray-300 mb-2">
              Designed and developed a Job Fair Management application enabling recruiters and candidates to seamlessly manage job postings, applications, and interview scheduling using the MERN stack.
            </p>
            <span className="inline-block bg-green-800 text-green-100 px-2 py-1 rounded text-xs">MongoDB</span>
            <span className="inline-block bg-blue-800 text-blue-100 px-2 py-1 rounded text-xs ml-2">Express</span>
            <span className="inline-block bg-cyan-800 text-cyan-100 px-2 py-1 rounded text-xs ml-2">React</span>
            <span className="inline-block bg-yellow-800 text-yellow-100 px-2 py-1 rounded text-xs ml-2">Node.js</span>
          </motion.div>

          {/* Event Management */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-pink-400 mb-2">Event Management System</h3>
            <p className="text-gray-300 mb-2">
              Built a comprehensive event management solution for creating, organizing, and tracking events and registrations using the MERN stack.
            </p>
            <span className="inline-block bg-green-800 text-green-100 px-2 py-1 rounded text-xs">MongoDB</span>
            <span className="inline-block bg-blue-800 text-blue-100 px-2 py-1 rounded text-xs ml-2">Express</span>
            <span className="inline-block bg-cyan-800 text-cyan-100 px-2 py-1 rounded text-xs ml-2">React</span>
            <span className="inline-block bg-yellow-800 text-yellow-100 px-2 py-1 rounded text-xs ml-2">Node.js</span>
          </motion.div>

          {/* MLOps NLP Pipeline Project */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">MLOps NLP Pipeline Project</h3>
            <p className="text-gray-300 mb-2">
              Developed an end-to-end MLOps pipeline for news text classification using Airflow for orchestration, MLflow for experiment tracking, FastAPI for model serving, and Prometheus + Grafana for API monitoring.
            </p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-2">
              <li>Automated data processing, feature engineering, and model training</li>
              <li>Implemented robust monitoring dashboards</li>
              <li>Containerized using Docker Compose</li>
            </ul>
            <span className="inline-block bg-cyan-950 text-cyan-200 px-2 py-1 rounded text-xs">Airflow</span>
            <span className="inline-block bg-gray-800 text-gray-100 px-2 py-1 rounded text-xs ml-2">MLflow</span>
            <span className="inline-block bg-blue-800 text-blue-100 px-2 py-1 rounded text-xs ml-2">FastAPI</span>
            <span className="inline-block bg-yellow-800 text-yellow-100 px-2 py-1 rounded text-xs ml-2">Prometheus</span>
            <span className="inline-block bg-green-800 text-green-100 px-2 py-1 rounded text-xs ml-2">Grafana</span>
          </motion.div>

          {/* Income Prediction Analysis Project */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-amber-400 mb-2">Income Prediction Analysis</h3>
            <p className="text-gray-300 mb-2">
              Performed extensive EDA and built predictive models (Logistic Regression & SVM) for U.S. Census income classification using multiple preprocessing pipelines. Used <b>DVC integrated with Google Drive</b> for efficient experiment and dataset versioning.
            </p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-2">
              <li>Multiple imputation & scaling strategies</li>
              <li>Comprehensive performance comparison</li>
              <li>Key insights on demographic income factors</li>
              <li>DVC for reproducible pipelines (Google Drive remote)</li>
            </ul>
            <span className="inline-block bg-orange-800 text-orange-100 px-2 py-1 rounded text-xs">DVC</span>
            <span className="inline-block bg-blue-800 text-blue-100 px-2 py-1 rounded text-xs ml-2">Logistic Regression</span>
            <span className="inline-block bg-pink-800 text-pink-100 px-2 py-1 rounded text-xs ml-2">SVM</span>
          </motion.div>

          {/* Hateful Meme Classification */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-pink-400 mb-2">Hateful Meme Classification</h3>
            <p className="text-gray-300 mb-2">
              Implemented multimodal deep learning to classify memes as hateful or non-hateful by fusing image and text features. Explored early and late fusion strategies with models like BERT, LSTM, CNN, and ResNet.
            </p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-2">
              <li>Custom data loaders and augmentation</li>
              <li>Evaluation with AUROC, F1, confusion matrix</li>
              <li>Visualization: word clouds, class distribution</li>
            </ul>
            <span className="inline-block bg-pink-950 text-pink-200 px-2 py-1 rounded text-xs">BERT</span>
            <span className="inline-block bg-yellow-800 text-yellow-100 px-2 py-1 rounded text-xs ml-2">LSTM</span>
            <span className="inline-block bg-gray-800 text-gray-100 px-2 py-1 rounded text-xs ml-2">CNN</span>
            <span className="inline-block bg-blue-800 text-blue-100 px-2 py-1 rounded text-xs ml-2">ResNet</span>
          </motion.div>

          {/* Stationary Detector using YOLOv5 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-2">Stationary Detector (YOLOv5)</h3>
            <p className="text-gray-300 mb-2">
              Developed a custom YOLOv5 model and Streamlit web app to detect and count stationary items (Eraser, Pencil, Scale, Sharpener) in images, generating bills automatically.
            </p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-2">
              <li>Custom dataset training with Roboflow</li>
              <li>Real-time detection and billing UI</li>
              <li>Model retrainable with new data</li>
            </ul>
            <span className="inline-block bg-green-800 text-green-100 px-2 py-1 rounded text-xs">YOLOv5</span>
            <span className="inline-block bg-pink-800 text-pink-100 px-2 py-1 rounded text-xs ml-2">Streamlit</span>
            <span className="inline-block bg-gray-800 text-gray-100 px-2 py-1 rounded text-xs ml-2">Roboflow</span>
          </motion.div>

          {/* Task Manager with Docker & Kubernetes */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Task Manager (Docker & Kubernetes)</h3>
            <p className="text-gray-300 mb-2">
              Built a Flask & MongoDB task manager, fully containerized with Docker and deployable on Kubernetes. Used GitHub Actions for CI/CD automation and verification.
            </p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-2">
              <li>Add, complete, and delete tasks via intuitive UI</li>
              <li>Automatic testing & deployment with GitHub Actions</li>
              <li>Scalable microservices architecture</li>
            </ul>
            <span className="inline-block bg-blue-800 text-blue-100 px-2 py-1 rounded text-xs">Docker</span>
            <span className="inline-block bg-green-800 text-green-100 px-2 py-1 rounded text-xs ml-2">Kubernetes</span>
            <span className="inline-block bg-gray-800 text-gray-100 px-2 py-1 rounded text-xs ml-2">Flask</span>
            <span className="inline-block bg-purple-800 text-purple-100 px-2 py-1 rounded text-xs ml-2">MongoDB</span>
            <span className="inline-block bg-black text-white px-2 py-1 rounded text-xs ml-2">GitHub Actions</span>
          </motion.div>

          {/* Docker-Flask-Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Docker-Flask-Calculator</h3>
            <p className="text-gray-300 mb-2">
              Designed a RESTful calculator API using Flask, containerized with Docker, and setup a CI/CD pipeline via GitHub Actions for automated testing, linting, building, and Docker Hub deployment.
            </p>
            <span className="inline-block bg-yellow-800 text-yellow-100 px-2 py-1 rounded text-xs">Flask</span>
            <span className="inline-block bg-blue-800 text-blue-100 px-2 py-1 rounded text-xs ml-2">Docker</span>
            <span className="inline-block bg-black text-white px-2 py-1 rounded text-xs ml-2">GitHub Actions</span>
          </motion.div>

          {/* GitHub Workflows Automation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.9 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-400 mb-2">GitHub Workflows Automation</h3>
            <p className="text-gray-300 mb-2">
              Automated project testing workflows using GitHub Actions, ensuring code quality and reliability through continuous integration.
            </p>
            <span className="inline-block bg-black text-white px-2 py-1 rounded text-xs">GitHub Actions</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About;