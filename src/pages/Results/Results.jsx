import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultCard from '../../components/ResultCard/ResultCard';
import { wasteData } from '../../data/wasteData';
import './Results.css';

const Results = ({ item, locale, onNavigate }) => {
  const [feedbackSelection, setFeedbackSelection] = useState(null);

  const relatedItems = Object.values(wasteData.items)
    .filter(i => i.id !== item.id && i.material === item.material)
    .slice(0, 3);

  const handleNavigate = (page) => {
    if (typeof onNavigate === 'function') {
      onNavigate(page);
    }
  };

  const handleFeedback = (selection) => {
    if (!feedbackSelection) { // Only allow feedback once
      setFeedbackSelection(selection);
    }
  };

  return (
    <div className="results-page">
      <div className="container">
        <motion.button 
          className="back-btn"
          onClick={() => handleNavigate('home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          ← Back to Home
        </motion.button>

        <motion.div
          className="results-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Disposal Results</h1>
          <p>Here's how to properly dispose of your item in {locale}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ResultCard 
            item={item} 
            locale={locale} 
            onBack={() => handleNavigate('identification')} 
          />
        </motion.div>

        <motion.div 
          className="action-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button 
            className="btn btn-primary btn-large"
            onClick={() => handleNavigate('identification')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔍 Identify Another Item
          </motion.button>
          <motion.button 
            className="btn btn-secondary"
            onClick={() => handleNavigate('upcycling')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ♻️ More Upcycling Ideas
          </motion.button>
          <motion.button 
            className="btn btn-secondary"
            onClick={() => handleNavigate('local-rules')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📋 View Local Rules
          </motion.button>
        </motion.div>

        {relatedItems.length > 0 && (
          <motion.div 
            className="related-items-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3>Related Items</h3>
            <p>Other {item.material.toLowerCase()} items you might have</p>
            
            <div className="related-items-grid">
              {relatedItems.map((relatedItem, index) => (
                <motion.div
                  key={relatedItem.id}
                  className="related-item-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="related-item-icon">
                    {relatedItem.name.includes('Plastic') && '🧴'}
                    {relatedItem.name.includes('Glass') && '🍶'}
                    {relatedItem.name.includes('Metal') && '🥫'}
                    {relatedItem.name.includes('Paper') && '📰'}
                    {relatedItem.name.includes('Card') && '📦'}
                    {relatedItem.name.includes('Food') && '🍎'}
                    {relatedItem.name.includes('Battery') && '🔋'}
                  </div>
                  <h4>{relatedItem.name}</h4>
                  <div className={`bin-tag ${relatedItem.binColor.toLowerCase()}`}>
                    {relatedItem.binColor} Bin
                  </div>
                  <motion.button 
                    className="btn btn-small"
                    onClick={() => handleNavigate('identification')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div 
          className="feedback-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3>Was this information helpful?</h3>
          <div className="feedback-buttons">
            <motion.button 
              className={`feedback-btn yes ${feedbackSelection === 'yes' ? 'selected' : ''}`}
              onClick={() => handleFeedback('yes')}
              disabled={!!feedbackSelection}
              whileHover={{ scale: feedbackSelection ? 1 : 1.05 }}
              whileTap={{ scale: feedbackSelection ? 1 : 0.95 }}
            >
              👍 Yes
            </motion.button>
            <motion.button 
              className={`feedback-btn no ${feedbackSelection === 'no' ? 'selected' : ''}`}
              onClick={() => handleFeedback('no')}
              disabled={!!feedbackSelection}
              whileHover={{ scale: feedbackSelection ? 1 : 1.05 }}
              whileTap={{ scale: feedbackSelection ? 1 : 0.95 }}
            >
              👎 No
            </motion.button>
          </div>
          <AnimatePresence>
            {feedbackSelection && (
              <motion.div
                className="feedback-confirmation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Thank you for your feedback!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;