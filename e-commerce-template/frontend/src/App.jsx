import React from 'react';
import { useTheme } from './Context/ThemeContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header.jsx';
import Home from './components/home.jsx';
function App() {

  return (
    <Router>
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header />
      
      <main >
       <Home />
      </main>
    </div>
    </Router>
  );
}

export default App;
