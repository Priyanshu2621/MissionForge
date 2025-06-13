// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Home.css';

const HomePage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
          <li><a href="#about-us">About Us</a></li>
          <li><a href="#community-sharing">Share Your Mission</a></li>
          <li><a href="#Account">Account</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero">
        <div className="hero-content">
          <h1>Forge Your Missions, Shape the Future</h1>
          <Link to="/create-mission">
            <button className="button-primary">Create Mission</button>
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="features">
        <h2 className="section-title">Mission Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Mission Visualization</h3>
            <p>Turn your ideas into interactive, playable missions.</p>
          </div>
          <div className="feature-card">
            <h3>Share Missions</h3>
            <p>Share your creations with the community and collaborate.</p>
          </div>
          <div className="feature-card">
            <h3>Mission Flow Integration</h3>
            <p>Bring your mission flow to life with rich interactions.</p>
          </div>
        </div>
      </section>

      {/* Create Mission CTA */}
      <section id="create-mission" className="create-mission">
        <h2 className="section-title">Start Your Mission</h2>
        <p>Design the next unforgettable adventure.</p>
        <Link to="/create-mission">
          <button>Create a New Mission</button>
        </Link>
      </section>

      {/* Trending Missions */}
      <section id="trending-missions" className="trending-missions">
        <h2 className="section-title">Trending Missions</h2>
        <div className="mission-cards">
          <MissionCard title="Mission Title 1" description="A brief description of the mission." />
          <MissionCard title="Mission Title 2" description="A brief description of the mission." />
          <MissionCard title="Mission Title 3" description="A brief description of the mission." />
        </div>
      </section>

      {/* Community Sharing */}
      <section id="community-sharing" className="community-sharing">
        <h2 className="section-title">Share Your Mission</h2>
        <a href="#share-form" className="button-primary">Post Your Mission</a>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 MissionForge | All Rights Reserved</p>
        <p>Follow us on social media</p>
        <p><a href="#">FAQ</a> | <a href="#">Community</a> | <a href="#">Legal</a></p>
      </footer>
    </div>
  );
};

const MissionCard = ({ title, description }) => (
  <div className="mission-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <a href="#" className="button-primary">Explore</a>
  </div>
);

export default HomePage;
