// Header.jsx - Enhanced Version
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = ({ currentPage, onNavigate, darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'identification', label: 'Identify', icon: '🔍' },
    { id: 'local-rules', label: 'Local Rules', icon: '📋' },
    { id: 'upcycling', label: 'Upcycling', icon: '♻️' },
    
  ];

  const handleNavigation = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  // Particle effect for header background
  const renderParticles = () => {
    return Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ));
  };

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
      style={{ 
        opacity: headerOpacity,
        scale: headerScale,
      }}
    >
      <div className="header-particles">
        {renderParticles()}
      </div>
      
      <div className="container">
        <div className="header-content">
          {/* Enhanced Large Logo */}
          <motion.div
            className="logo"
            onClick={() => handleNavigation('home')}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div className="logo-icon-wrapper">
              <motion.span 
                className="logo-icon"
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                whileHover={{ 
                  scale: 1.4, 
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
              >
                🌱
              </motion.span>
              <motion.div
                className="logo-glow"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <div className="logo-text">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="logo-word smart">Smart</span>
                <span className="logo-word eco">Eco</span>
                <span className="logo-word dispose">dispose</span>
              </motion.h1>
              <motion.p
                className="logo-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Recycle Smarter, Live Greener
              </motion.p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="nav-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <nav className="nav">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`nav-btn ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.id)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -3,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="nav-icon"
                    whileHover={{ 
                      scale: 1.4,
                      rotate: 15,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="nav-label">{item.label}</span>
                  <AnimatePresence>
                    {currentPage === item.id && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeIndicator"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </nav>

            {/* Enhanced Theme Toggle */}
            <motion.button
              className="theme-toggle"
              onClick={toggleDarkMode}
              whileHover={{ 
                scale: 1.2,
                rotate: 180,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={darkMode ? 'moon' : 'sun'}
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  {darkMode ? '🌙' : '☀️'}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-nav-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`mobile-nav-btn ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated underline */}
      <motion.div
        className="header-underline"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3, type: "spring" }}
      />
    </motion.header>
  );
};

export default Header;