import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateMission from './components/CreateMission';
import GameRenderer from './components/GameRenderer';
import PlayMission from './components/PlayMission'; // 👈 This will load Scene.jsx with gameData

function App() {
  return (
    <Router>
      <div style={{ height: '100vh' }}>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Create Mission Page */}
          <Route path="/create-mission" element={<CreateMission />} />

          {/* Play Game Route (loads Scene.jsx via PlayMission.jsx) */}
          <Route path="/play-game" element={<PlayMission />} />

          {/* (Optional) Extra renderer or UI components */}
          <Route path="/game-renderer" element={<GameRenderer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
