import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Identification from './pages/Identification/Identification';
import Results from './pages/Results/Results';
import Upcycling from './pages/Upcycling/Upcycling';
import LocalRules from './pages/LocalRules/LocalRules';
import { useDarkMode } from './hooks/useDarkMode';
import { pageVariants } from './utils/animations';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [detectedItem, setDetectedItem] = useState(null);
  const [selectedLocale, setSelectedLocale] = useState('Germany');
  const { darkMode, toggleDarkMode } = useDarkMode();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onNavigate={setCurrentPage}
            selectedLocale={selectedLocale}
            setSelectedLocale={setSelectedLocale}
          />
        );
      case 'identification':
        return (
          <Identification 
            onBack={() => setCurrentPage('home')}
            onResult={(item) => {
              setDetectedItem(item);
              setCurrentPage('results');
            }}
            selectedLocale={selectedLocale}
          />
        );
      case 'results':
        return (
          <Results 
            item={detectedItem}
            locale={selectedLocale}
            onBack={() => setCurrentPage('identification')}
            onNavigate={setCurrentPage}
          />
        );
      case 'upcycling':
        return <Upcycling onBack={() => setCurrentPage('home')} />;
      case 'local-rules':
        return (
          <LocalRules 
            onBack={() => setCurrentPage('home')}
            selectedLocale={selectedLocale}
            setSelectedLocale={setSelectedLocale}
          />
        );
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Header 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;