import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';
import './ResultCard.css';

const ResultCard = ({ item, onBack }) => {
  const [isSaved, setIsSaved] = useState(false);

  // Safe default values
  const safeItem = item || {};
  const {
    name = 'Unknown Item',
    material = 'unknown',
    category = 'General Waste',
    disposal = 'Check local guidelines',
    tips = [],
    confidence = 'N/A',
    binColor = 'gray'
  } = safeItem;

  const materialClass = material?.toLowerCase() || 'unknown';
  
  const handleSave = () => {
    setIsSaved(true);
    // Simulate saving and reset after a few seconds
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <motion.div 
      className="result-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="result-main">
        <div className="item-info">
          <h2>{name}</h2>
          <div className="item-details">
            <div className="detail-item">
              <span className="detail-label">Material:</span>
              <span className={`detail-value material-${materialClass}`}>
                {material}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value category">{category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Confidence:</span>
              <span className="detail-value confidence">{confidence}</span>
            </div>
          </div>
        </div>

        <div className={`disposal-instruction ${binColor}`}>
          <div className="bin-color-indicator"></div>
          <div className="disposal-content">
            <h3>Disposal Method</h3>
            <p className="disposal-method">{disposal}</p>
          </div>
        </div>
      </div>

      {tips && tips.length > 0 && (
        <motion.div 
          className="tips-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4>💡 Important Tips</h4>
          <ul className="tips-list">
            {tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
              >
                {tip}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div 
        className="action-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <button className="btn btn-secondary" onClick={onBack}>
          Identify Another Item
        </button>
        <button 
          className={`btn btn-primary ${isSaved ? 'saved' : ''}`}
          onClick={handleSave}
          disabled={isSaved}
        >
          {isSaved ? '✓ Saved!' : 'Save Result'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ResultCard;