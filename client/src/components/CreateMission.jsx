import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../components/CreateMission.css';
import GTAV from "../image/GTAV.jpg";
import CP2077 from "../image/CP2077.webp";
import RDR2 from "../image/RDR2.avif";
import WatchDogs2 from "../image/WatchDogs2.jpeg";

const topGames = [
  { name: 'GTA V', image: GTAV },
  { name: 'Red Dead Redemption 2', image: RDR2 },
  { name: 'Cyberpunk 2077', image: CP2077 },
  { name: 'Watch Dogs 2', image: WatchDogs2 }
];

const CreateMission = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a mission description.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/generate-scene', {
        prompt: prompt,
        game: selectedGame
      });

      // Option 1: Send gameData via state
      // navigate('/play-game', { state: { gameData: response.data } });

      // Option 2 (recommended): Save to localStorage
      localStorage.setItem("gameData", JSON.stringify(response.data));
      navigate("/play-game");
    } catch (err) {
      console.error('❌ Error generating game:', err);
      setError('Failed to generate mission. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-mission-container">
      {/* Navigation */}
      <nav className="navbar">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#about-us">About Us</a></li>
          <li><a href="#community-sharing">Share Your Mission</a></li>
          <li><a href="#account">Account</a></li>
        </ul>
      </nav>

      {/* Top Games Section */}
      <div className="top-games-section">
        <h2>Select a Game</h2>
        <div className="game-cards">
          {topGames.map((game) => (
            <div
              key={game.name}
              className={`game-card ${selectedGame === game.name ? 'selected' : ''}`}
              onClick={() => setSelectedGame(game.name)}
            >
              <img src={game.image} alt={game.name} />
              <p>{game.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conditional Create Mission Box */}
      {selectedGame && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-button" onClick={onClose}>×</button>
            <h2>Create Mission for {selectedGame}</h2>
            <textarea
              placeholder={`Enter your mission idea for ${selectedGame}...`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows="4"
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleGenerate} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Mission'}
            </button>
            <button className="download-btn">Download Missions</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <p>&copy; 2025 MissionForge | All Rights Reserved</p>
        <p>Follow us on social media</p>
        <p><a href="#">FAQ</a> | <a href="#">Community</a> | <a href="#">Legal</a></p>
      </footer>
    </div>
  );
};

export default CreateMission;
