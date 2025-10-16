import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import './LocalRules.css';

const LocalRules = ({ onNavigate, selectedLocale, setSelectedLocale }) => {
  const [activeBin, setActiveBin] = useState(null);

  // Mock data for different locales
  const localeRules = {
    'India': {
      colors: {
        'Blue': {
          category: 'Dry Waste',
          tips: 'Recyclable materials',
          items: ['Paper', 'Plastic', 'Metal', 'Glass']
        },
        'Green': {
          category: 'Wet Waste',
          tips: 'Biodegradable materials',
          items: ['Food scraps', 'Garden waste', 'Organic materials']
        }
      },
      pickup: {
        'Blue': 'Every Monday and Thursday',
        'Green': 'Daily collection'
      }
    },
    'Germany': {
      colors: {
        'Yellow': {
          category: 'Packaging',
          tips: 'Plastic and metal packaging',
          items: ['Plastic packaging', 'Metal cans', 'Composite materials']
        },
        'Blue': {
          category: 'Paper',
          tips: 'Paper and cardboard',
          items: ['Newspapers', 'Cardboard', 'Office paper']
        },
        'Green': {
          category: 'Bio Waste',
          tips: 'Organic materials',
          items: ['Food scraps', 'Garden waste']
        }
      }
    },
    'USA': {
      colors: {
        'Blue': {
          category: 'Recyclables',
          tips: 'Mixed recyclables',
          items: ['Paper', 'Cardboard', 'Plastic', 'Metal', 'Glass']
        },
        'Green': {
          category: 'Organics',
          tips: 'Food and yard waste',
          items: ['Food scraps', 'Yard trimmings']
        },
        'Black': {
          category: 'Landfill',
          tips: 'Non-recyclable waste',
          items: ['Plastic bags', 'Styrofoam', 'Ceramics']
        }
      }
    },
    'UK': {
      colors: {
        'Blue': {
          category: 'Recyclables',
          tips: 'Paper and cardboard',
          items: ['Newspapers', 'Cardboard', 'Magazines']
        },
        'Green': {
          category: 'Recyclables',
          tips: 'Glass and plastic',
          items: ['Glass bottles', 'Plastic bottles', 'Jars']
        },
        'Brown': {
          category: 'Garden Waste',
          tips: 'Organic garden materials',
          items: ['Grass cuttings', 'Leaves', 'Small branches']
        }
      }
    }
  };

  const locales = Object.keys(localeRules);
  const currentRules = localeRules[selectedLocale] || localeRules['India'];

  return (
    <div className="local-rules-page">
      <div className="container">
        {/* "Back to Home" button has been removed from here */}
        
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Local Recycling Rules</h1>
          <p>Understand your city's specific waste management system and sorting guidelines</p>
        </motion.div>

        {/* Location Selector */}
        <motion.div 
          className="location-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <label htmlFor="locale-select">Select Your Location:</label>
          <select 
            id="locale-select"
            value={selectedLocale}
            onChange={(e) => setSelectedLocale(e.target.value)}
          >
            {locales.map(locale => (
              <option key={locale} value={locale}>{locale}</option>
            ))}
          </select>
        </motion.div>

        {/* Rules Overview */}
        <motion.section 
          className="rules-overview"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={fadeInUp}>
            Recycling System in {selectedLocale}
          </motion.h2>
          
          <motion.div 
            className="bins-grid"
            variants={fadeInUp}
          >
            {Object.entries(currentRules.colors).map(([color, info]) => (
              <motion.div
                key={color}
                className={`bin-card ${color.toLowerCase()} ${activeBin === color ? 'active' : ''}`}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveBin(activeBin === color ? null : color)}
              >
                <div className="bin-color-indicator"></div>
                <div className="bin-info">
                  <h3>{color} Bin</h3>
                  <p className="bin-category">{info.category}</p>
                  <p className="bin-tip">{info.tips}</p>
                  
                  {activeBin === color && (
                    <motion.div 
                      className="bin-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>Common Items:</h4>
                      <ul>
                        {info.items.map(item => (
                          <li key={item}>✓ {item}</li>
                        ))}
                      </ul>
                      
                      {currentRules.pickup && currentRules.pickup[color] && (
                        <div className="pickup-schedule">
                          <h4>🗓️ Pickup Schedule:</h4>
                          <p>{currentRules.pickup[color]}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Quick Guide */}
        <motion.section 
          className="quick-guide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Quick Recycling Guide</h2>
          <div className="guide-tips">
            <div className="tip-card">
              <div className="tip-icon">🧹</div>
              <h4>Clean & Dry</h4>
              <p>Always rinse containers and let them dry before recycling</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🚫</div>
              <h4>No Plastic Bags</h4>
              <p>Never put recyclables in plastic bags - they jam machinery</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🏷️</div>
              <h4>Check Labels</h4>
              <p>Look for recycling symbols and follow local guidelines</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📞</div>
              <h4>When in Doubt</h4>
              <p>Contact your local waste management authority</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default LocalRules;