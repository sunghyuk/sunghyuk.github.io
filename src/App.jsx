// src/App.jsx

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LadderGame from './pages/LadderGame';
import LadderSetup from './pages/LadderSetup';
import Base64Tool from './pages/Base64Tool';
import JsonViewerPage from './pages/JsonViewerPage';

export default function App() {
    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>🏠 Home</Link>
                <Link to="/ladder" style={{ marginRight: '1rem' }}>🪜 Ladder Game</Link>
                <Link to="/base64" style={{ marginRight: '1rem' }}>🔐 Base64 Tool</Link>
                <Link to="/json">🧾 JSON Viewer</Link>
            </nav>
            <main style={{ padding: '2rem' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ladder" element={<LadderSetup />} />
                    <Route path="/ladder/game" element={<LadderGame />} />
                    <Route path="/base64" element={<Base64Tool />} />
                    <Route path="/json" element={<JsonViewerPage />} />
                </Routes>
            </main>
        </div>
    );
}
