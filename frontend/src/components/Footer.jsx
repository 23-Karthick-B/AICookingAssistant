export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>🍳 AI Cooking Assistant</h4>
          <p>Transform your ingredients into delicious recipes with AI.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/create">Create Recipe</a></li>
            <li><a href="/favorites">Favorites</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li>AI Recipe Generation</li>
            <li>Personalized Recipes</li>
            <li>Step-by-Step Cooking</li>
            <li>Save Favorites</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 AI Cooking Assistant. All rights reserved.</p>
      </div>
    </footer>
  );
}
