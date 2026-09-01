import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">🍳</span>
          AI Cooking Assistant
        </Link>

        <div className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className="navbar-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/create"
            className="navbar-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Create Recipe
          </Link>
          <Link
            to="/favorites"
            className="navbar-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            ❤️ Favorites
          </Link>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
