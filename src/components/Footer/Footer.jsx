// Footer.jsx - Enhanced Version
import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  const handleNavigation = (page) => {
    // If the user clicks any main navigation link, smoothly scroll to the top.
    if (page === 'home' || page === 'identification' || page === 'local-rules' || page === 'upcycling') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    // Call the original navigation function if it exists
    if (typeof onNavigate === 'function') {
      onNavigate(page);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>🌱 Smart Ecodispose</h3>
            <p>
              AI-powered waste management solution helping communities recycle
              smarter and live greener. Join thousands making a difference.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4>Quick Links</h4>
            <ul>
              <li>
                <button onClick={() => handleNavigation('home')}>
                  🏠 Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('identification')}>
                  🔍 Identify Waste
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('local-rules')}>
                  📋 Local Rules
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('upcycling')}>
                  ♻️ Upcycling Ideas
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Resources</h4>
            <ul>
              <li><button>📚 Recycling Guide</button></li>
              <li><button>🌍 Environmental Impact</button></li>
              <li><button>📊 Statistics</button></li>
              <li><button>💡 Tips & Tricks</button></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Get in Touch</h4>
            <p>📧 contact@smartecodispose.com</p>
            <p>📞 +91-8788902345</p>
            <p>📍 Green City, Eco Street 123</p>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>
            © {new Date().getFullYear()} Smart Ecodispose. All rights reserved. 
            Making the world greener, one item at a time. 🌍♻️
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;