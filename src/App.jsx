// src/App.jsx

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LadderGame from './pages/LadderGame';
import LadderSetup from './pages/LadderSetup';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>🏠 Home</Link>
        <Link to="/ladder">🪜 Ladder Game</Link>
      </nav>
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ladder" element={<LadderSetup />} />
          <Route path="/ladder/game" element={<LadderGame />} />
        </Routes>
      </main>
    </div>
  );
}


