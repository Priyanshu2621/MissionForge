// src/components/TextToMission.jsx
import React, { useState } from 'react';

const TextToMission = ({ onConvert }) => {
  const [inputText, setInputText] = useState('');

  const handleConvert = () => {
    const parts = inputText.split('→').map(p => p.trim()).filter(p => p);

    const nodes = {};
    parts.forEach((text, index) => {
      const id = (index + 1).toString();
      const nextId = (index + 2).toString();
      nodes[id] = {
        text,
        options: index < parts.length - 1 ? [{ text: 'Next', next: nextId }] : []
      };
    });

    const mission = {
      start: '1',
      nodes
    };

    onConvert(mission);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Text to Mission Converter</h2>
      <textarea
        placeholder="Write your mission steps using →"
        rows={5}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={styles.textarea}
      />
      <button onClick={handleConvert} style={styles.button}>Convert to Mission</button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    maxWidth: '600px',
    margin: '2rem auto'
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '1rem'
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    marginBottom: '1rem'
  },
  button: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer'
  }
};

// export default TextToMission;