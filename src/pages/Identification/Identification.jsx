import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wasteData } from '../../data/wasteData';
import CameraInput from '../../components/CameraInput/CameraInput';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { analyzeImage } from '../../services/geminiService';
import './Identification.css';

const Identification = ({ onBack, onResult, selectedLocale }) => {
  const [activeTab, setActiveTab] = useState('camera');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // This receives the analyzed result from CameraInput
  const handleImageCapture = (result) => {
    onResult(result);
  };

  const handleTextSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsAnalyzing(true);
      // Simulate search and analysis
      setTimeout(() => {
        const items = Object.values(wasteData.items);
        const matchedItem = items.find(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.material.toLowerCase().includes(searchQuery.toLowerCase())
        ) || items[Math.floor(Math.random() * items.length)];
        
        setIsAnalyzing(false);
        onResult(matchedItem);
      }, 1500);
    }
  };

  const quickItems = [
    { name: 'Plastic Bottle', icon: '🧴', id: 'plastic-bottle' },
    { name: 'Glass Jar', icon: '🍶', id: 'glass-bottle' },
    { name: 'Aluminum Can', icon: '🥫', id: 'aluminum-can' },
    { name: 'Newspaper', icon: '📰', id: 'newspaper' },
    { name: 'Cardboard', icon: '📦', id: 'cardboard' },
    { name: 'Battery', icon: '🔋', id: 'battery' },
  ];

  const handleQuickItemSelect = (itemId) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const item = wasteData.items[itemId];
      setIsAnalyzing(false);
      onResult(item);
    }, 1000);
  };

  return (
    <div className="identification-page">
      <div className="container">
        <motion.button 
          className="back-btn"
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          ← Back to Home
        </motion.button>

        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Identify Your Item</h1>
          <p>Choose your preferred method to identify how to dispose of your item</p>
          <div className="locale-badge">
            📍 Currently viewing rules for: <strong>{selectedLocale}</strong>
          </div>
        </motion.div>

        {/* Analysis Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              className="analysis-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="analysis-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="loading-spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ♻️
                </motion.div>
                <h3>Analyzing your item...</h3>
                <p>Our AI is identifying the best disposal method</p>
                <motion.div 
                  className="loading-dots"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Method Tabs */}
        <motion.div 
          className="method-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'camera' ? 'active' : ''}`}
              onClick={() => setActiveTab('camera')}
            >
              📷 Camera
            </button>
            <button 
              className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              🔍 Search
            </button>
            <button 
              className={`tab-btn ${activeTab === 'quick' ? 'active' : ''}`}
              onClick={() => setActiveTab('quick')}
            >
              ⚡ Quick Pick
            </button>
          </div>

          <div className="tab-content">
            <AnimatePresence mode="wait">
              {activeTab === 'camera' && (
                <motion.div
                  key="camera"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CameraInput 
                    onImageCapture={handleImageCapture}
                  />
                </motion.div>
              )}

              {activeTab === 'search' && (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="search-section">
                    <form onSubmit={handleTextSearch} className="search-form">
                      <div className="search-input-wrapper">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Describe your item (e.g., 'plastic bottle', 'glass jar', 'food scraps')"
                          className="search-input"
                        />
                        <button type="submit" className="search-btn">
                          🔍
                        </button>
                      </div>
                    </form>
                    
                    <div className="search-examples">
                      <h4>Try searching for:</h4>
                      <div className="example-tags">
                        {['plastic', 'glass', 'metal', 'paper', 'food', 'battery', 'electronics'].map(tag => (
                          <button
                            key={tag}
                            className="example-tag"
                            onClick={() => setSearchQuery(tag)}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'quick' && (
                <motion.div
                  key="quick"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="quick-items-grid">
                    {quickItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        className="quick-item-card"
                        onClick={() => handleQuickItemSelect(item.id)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="quick-item-icon">{item.icon}</div>
                        <span>{item.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div 
          className="tips-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>💡 Tips for Better Identification</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">📸</div>
              <h4>Clear Photos</h4>
              <p>Take photos in good lighting with a clear view of the item</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🧹</div>
              <h4>Clean Items</h4>
              <p>Make sure items are clean and dry for accurate recycling</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🏷️</div>
              <h4>Check Labels</h4>
              <p>Look for recycling symbols and material information</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔍</div>
              <h4>Be Specific</h4>
              <p>Use detailed descriptions when searching for items</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Identification;