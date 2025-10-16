import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import './Upcycling.css';

const Upcycling = ({ onNavigate, selectedLocale }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🌟' },
    { id: 'easy', name: 'Easy', icon: '🟢' },
    { id: 'medium', name: 'Medium', icon: '🟡' },
    { id: 'hard', name: 'Hard', icon: '🔴' }
  ];

  // Mock upcycling projects data
  const upcyclingProjects = {
    'plant-pots': {
      id: 'plant-pots',
      name: 'Plastic Bottle Plant Pots',
      difficulty: 'Easy',
      time: '15-30 mins',
      materials: ['Plastic bottles', 'Scissors', 'Soil', 'Seeds'],
      steps: [
        'Cut plastic bottle in half',
        'Make drainage holes in the bottom',
        'Fill with soil and plant seeds',
        'Water regularly and watch them grow'
      ],
      benefits: 'Reduces plastic waste and creates beautiful plants'
    },
    'bird-feeder': {
      id: 'bird-feeder',
      name: 'Milk Carton Bird Feeder',
      difficulty: 'Easy',
      time: '20 mins',
      materials: ['Milk carton', 'String', 'Bird seed', 'Scissors'],
      steps: [
        'Clean and dry the milk carton',
        'Cut openings for birds to enter',
        'Attach string for hanging',
        'Fill with bird seed and hang outside'
      ],
      benefits: 'Helps local wildlife and reuses packaging'
    },
    'glass-jars': {
      id: 'glass-jars',
      name: 'Glass Jar Storage',
      difficulty: 'Easy',
      time: '5 mins',
      materials: ['Glass jars', 'Labels', 'Decorations'],
      steps: [
        'Clean and dry glass jars thoroughly',
        'Remove any labels or adhesive',
        'Add your own labels for organization',
        'Use for storing spices, crafts, or office supplies'
      ],
      benefits: 'Organizes your space while reducing waste'
    }
  };

  const filteredProjects = selectedCategory === 'all' 
    ? Object.values(upcyclingProjects)
    : Object.values(upcyclingProjects).filter(
        project => project.difficulty.toLowerCase() === selectedCategory
      );

  const featuredProject = upcyclingProjects['plant-pots'];

  return (
    <div className="upcycling-page">
      <div className="container">
        {/* "Back to Home" button has been removed */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Creative Upcycling Ideas</h1>
          <p>Transform your waste into something useful and beautiful with these creative projects</p>
        </motion.div>

        <motion.section 
          className="featured-project-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>🌟 Featured Project</h2>
          <div className="featured-project-card">
            <div className="project-content">
              <div className="project-header">
                <h3>{featuredProject.name}</h3>
                <div className="project-meta">
                  <span className={`difficulty-badge ${featuredProject.difficulty.toLowerCase()}`}>{featuredProject.difficulty}</span>
                  <span className="time-badge">⏱️ {featuredProject.time}</span>
                </div>
              </div>
              
              <div className="materials-list">
                <h4>Materials Needed:</h4>
                <div className="materials-tags">
                  {featuredProject.materials.map(material => (
                    <span key={material} className="material-tag">{material}</span>
                  ))}
                </div>
              </div>

              <div className="steps-section">
                <h4>Step-by-Step Guide:</h4>
                <div className="steps-list">
                  {featuredProject.steps.map((step, index) => (
                    <motion.div 
                      key={index}
                      className="step-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="step-number">{index + 1}</div>
                      <p>{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="project-benefits">
                <h4>✨ Benefits:</h4>
                <p>{featuredProject.benefits}</p>
              </div>
            </div>
            
            <motion.div 
              className="project-visual"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="visual-placeholder">
                🧴 → 🌱
              </div>
              <p>Plastic Bottles to Plant Pots</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="categories-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Browse Projects by Difficulty</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className="category-icon">{category.icon}</div>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="projects-section"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <h2>All Upcycling Projects</h2>
          <motion.div className="projects-grid">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-image">
                    <div className="image-placeholder">
                      {project.name.includes('Plant') && '🧴'}
                      {project.name.includes('Bird') && '🥛'}
                      {project.name.includes('Glass') && '🍶'}
                    </div>
                  </div>
                  
                  <div className="project-info">
                    <div className="project-meta">
                      <span className={`difficulty-badge ${project.difficulty.toLowerCase()}`}>
                        {project.difficulty}
                      </span>
                      <span className="time-badge">⏱️ {project.time}</span>
                    </div>
                    
                    <h3>{project.name}</h3>
                    <p className="project-description">
                      {project.steps[0].substring(0, 100)}...
                    </p>
                    
                    <div className="materials-preview">
                      {project.materials.slice(0, 2).map(material => (
                        <span key={material} className="material-tag small">
                          {material}
                        </span>
                      ))}
                      {project.materials.length > 2 && (
                        <span className="material-tag small">
                          +{project.materials.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                className="modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="close-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
                
                <h2>{selectedProject.name}</h2>
                <div className="modal-meta">
                  <span className={`difficulty-badge ${selectedProject.difficulty.toLowerCase()}`}>
                    {selectedProject.difficulty}
                  </span>
                  <span className="time-badge">⏱️ {selectedProject.time}</span>
                </div>

                <div className="modal-sections">
                  <div className="modal-section">
                    <h4>Materials Needed</h4>
                    <div className="materials-tags">
                      {selectedProject.materials.map(material => (
                        <span key={material} className="material-tag">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-section">
                    <h4>Instructions</h4>
                    <div className="steps-list">
                      {selectedProject.steps.map((step, index) => (
                        <div key={index} className="step-item">
                          <div className="step-number">{index + 1}</div>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="modal-section">
                    <h4>✨ Benefits</h4>
                    <p>{selectedProject.benefits}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Upcycling;