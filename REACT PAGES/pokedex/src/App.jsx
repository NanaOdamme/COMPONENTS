// src/App.jsx
import React from 'react';
import './index.css';
import Pokedex from './components/Pokedex';

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-b from-zinc-950 via-purple-500 to-zinc-800">
      <Pokedex />
    </div>
  );
}

export default App;
