import React, { useState, useEffect } from "react";
import axios from "axios";
import Scene from "./Scene";

const GameRenderer = () => {
  const [gameData, setGameData] = useState(null);
  const [prompt, setPrompt] = useState("A thief in a bank with police");

  const generateGame = async () => {
    try {
      const response = await axios.post("http://localhost:5000/generate_game", {
        prompt,
      });
      setGameData(response.data);
    } catch (error) {
      console.error("Error generating game:", error);
    }
  };

  useEffect(() => {
    generateGame(); // auto-run once
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
        style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
      />
      <button
        onClick={generateGame}
        style={{ position: "absolute", top: 10, left: 250, zIndex: 1 }}
      >
        Generate
      </button>
      {gameData && <Scene gameData={gameData} />}
    </div>
  );
};

export default GameRenderer;
