import React, { useState, useEffect } from 'react';
import Scene from './Scene';

const PlayMission = () => {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const res = await fetch("/api/generate-scene", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: "bank robbery near atm with patrolling police" }),
        });

        const data = await res.json();
        console.log("✅ gameData received:", data); // ADD THIS
        setGameData(data);
      } catch (err) {
        console.error("❌ Error fetching game data:", err); // LOG ANY ERROR
      }
    };

    fetchGameData();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {gameData ? (
        <Scene gameData={gameData} />
      ) : (
        <p style={{ textAlign: "center", marginTop: "50px" }}>Loading mission scene...</p>
      )}
    </div>
  );
};

export default PlayMission;
