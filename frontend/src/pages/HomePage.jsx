import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WelcomeModal from "../components/WelcomeModal";

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem("aicookingassistant_welcome_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShowWelcome(true), 250);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    window.localStorage.setItem("aicookingassistant_welcome_dismissed", "true");
  };

  return (
    <div className="page home-page">
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-text">
            <span className="eyebrow">Smart kitchen companion</span>
            <h1>What can we cook with what you have?</h1>
            <p>
              Transform your ingredients into delicious, personalized recipes
              using AI. Get instant recipe suggestions based on your preferences,
              dietary restrictions, and cooking skill level.
            </p>
            <div className="hero-actions">
              <Link to="/create" className="cta-button">
                Start Cooking 🚀
              </Link>
              <Link to="/recipes" className="secondary-cta-button">
                Browse Ideas
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-emoji">👨‍🍳</div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why AI Cooking Assistant?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Recipe Generation</h3>
            <p>
              Powered by advanced AI, get creative and personalized recipe
              suggestions instantly.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Recipes</h3>
            <p>
              Recipes tailored to your cuisine preference, dietary needs, and
              cooking skill level.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🥘</div>
            <h3>Cook With What You Have</h3>
            <p>
              No need to shop for new ingredients. Create amazing dishes with
              what's already in your kitchen.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Step-by-Step Guidance</h3>
            <p>
              Follow easy-to-understand cooking instructions with timing
              suggestions and cooking tips.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Save Your Favorites</h3>
            <p>
              Bookmark recipes you love and build your personal collection for
              quick access anytime.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Healthy Options</h3>
            <p>
              Get health-conscious recipe recommendations that don't compromise
              on taste.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to start cooking?</h2>
        <p>Let's turn your ingredients into something delicious</p>
        <Link to="/create" className="secondary-cta-button">
          Create Your First Recipe →
        </Link>
      </section>
    </div>
  );
}
