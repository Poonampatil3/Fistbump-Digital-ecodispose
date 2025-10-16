// App.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Identification from "./pages/Identification/Identification";
import Results from "./pages/Results/Results";
import Upcycling from "./pages/Upcycling/Upcycling";
import LocalRules from "./pages/LocalRules/LocalRules";
import useDarkMode from "./hooks/useDarkMode";
import { pageVariants } from "./utils/animations";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [detectedItem, setDetectedItem] = useState(null);
  const [selectedLocale, setSelectedLocale] = useState("Germany");
  const [darkMode, toggleDarkMode] = useDarkMode();

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <Home onNavigate={setCurrentPage} selectedLocale={selectedLocale} setSelectedLocale={setSelectedLocale} />;
      case "identification": return <Identification onBack={() => setCurrentPage("home")} onResult={item => { setDetectedItem(item); setCurrentPage("results"); }} selectedLocale={selectedLocale} />;
      case "results": return <Results result={detectedItem} onBack={() => setCurrentPage("identification")} />;
      case "upcycling": return <Upcycling onNavigate={setCurrentPage} selectedLocale={selectedLocale} />;
      case "local-rules": return <LocalRules onNavigate={setCurrentPage} selectedLocale={selectedLocale} setSelectedLocale={setSelectedLocale} />;
      default: return <Home onNavigate={setCurrentPage} selectedLocale={selectedLocale} setSelectedLocale={setSelectedLocale} />;
    }
  };

  return (
    <div className={darkMode ? "dark-mode app" : "app"}>
      <Header 
        onNavigate={setCurrentPage} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        selectedLocale={selectedLocale} 
      />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.6 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
