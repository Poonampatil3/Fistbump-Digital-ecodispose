import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import './Home.css';
import robotIcon from './computer.png';
import { getChatbotResponse } from '../../services/chatbotService';

// --- Chatbot Component ---
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! How can I help you with your recycling questions today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const toggleChatbot = () => setIsOpen(!isOpen);
  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { from: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const botResponse = await getChatbotResponse(inputValue);
      setMessages(prev => [...prev, { from: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        from: 'bot', 
        text: "I'm having trouble connecting right now. Please try again later." 
      }]);
      console.error('Error getting bot response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        className="chatbot-toggle-btn"
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        title="Ask Eco Helper"
      >
        <img 
          src={robotIcon} 
          alt="Chatbot Assistant" 
          className="chatbot-icon-img"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="chatbot-header">
              <h3>Eco Helper</h3>
              <button onClick={toggleChatbot}>✕</button>
            </div>
            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.from}`}>
                  <div className="message-bubble">{msg.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="message-wrapper bot">
                  <div className="message-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form className="chatbot-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask about recycling..."
                autoFocus
              />
              <button type="submit" aria-label="Send Message">➤</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Home = ({ onNavigate }) => {
  const featuresRef = useRef([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    featuresRef.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Identification',
      description: 'Simply take a photo or upload an image to identify waste items instantly.'
    },
    {
      icon: '♻️',
      title: 'Smart Sorting',
      description: 'Get accurate disposal instructions based on your local recycling rules.'
    },
    {
      icon: '💡',
      title: 'Upcycling Ideas',
      description: 'Discover creative ways to reuse items instead of throwing them away.'
    },
    {
      icon: '📍',
      title: 'Localized Guidance',
      description: 'Tailored advice for your city\'s specific waste management system.'
    }
  ];

  const stats = [
    { number: '90%', label: 'Recycling Accuracy' },
    { number: '15+', label: 'Cities Supported' },
    { number: '50K+', label: 'Items Identifiable' },
    { number: '24/7', label: 'Available' }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Capture',
      description: 'Take or upload a photo of your waste item',
      icon: '📸'
    },
    {
      step: 2,
      title: 'Identify',
      description: 'AI analyzes and identifies the material',
      icon: '🔍'
    },
    {
      step: 3,
      title: 'Sort',
      description: 'Get sorting instructions for your area',
      icon: '✅'
    },
    {
      step: 4,
      title: 'Impact',
      description: 'Track your environmental contribution',
      icon: '🌍'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Parallax */}
      <section className="hero-section" ref={heroRef}>
        <motion.div className="container hero-content" style={{ y, opacity }}>
          <motion.div
            className="hero-text"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1 variants={fadeInUp}>
              Smart Recycling Made <span className="highlight">Simple</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="hero-description">
              Identify, sort, and recycle correctly with AI-powered waste classification.
              Join thousands making a difference, one item at a time.
            </motion.p>
            <motion.div variants={fadeInUp} className="hero-actions">
              <motion.button
                className="btn btn-primary btn-large"
                onClick={() => onNavigate('identification')}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(46, 125, 50, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>▶</span> Start Identifying
              </motion.button>
              <motion.button
                className="btn btn-secondary btn-large"
                onClick={() => onNavigate('local-rules')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📍</span> Find Local Rules
              </motion.button>
            </motion.div>
            <motion.div variants={fadeInUp} className="hero-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero-image-wrapper">
              <motion.div
                className="image-glow"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&h=600&fit=crop&q=80"
                alt="Smart recycling and waste management"
                className="hero-image"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="decorative-circle circle-1"
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="decorative-circle circle-2"
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="decorative-circle circle-3"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- Chatbot is rendered here --- */}
      <Chatbot />

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose Smart Ecodispose?</h2>
            <p>Powerful features to make recycling effortless and effective</p>
          </motion.div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                ref={el => featuresRef.current[index] = el}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className="feature-icon"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>How It Works</h2>
            <p>Four simple steps to smarter waste management</p>
          </motion.div>
          <div className="steps-container">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="step-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="step-number"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {step.step}
                </motion.div>
                <motion.div
                  className="step-icon"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.icon}
                </motion.div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Make a Difference?</h2>
            <p>Start your sustainable journey today with Smart Ecodispose</p>
            <motion.button
              className="btn btn-primary btn-large"
              onClick={() => onNavigate('identification')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🚀</span> Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
