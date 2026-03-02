export default function WelcomeModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card slide-down">

        <h2>🍳 Welcome to AI Cooking Assistant</h2>

        <p className="subtitle">
          Turn your ingredients into delicious recipes instantly.
        </p>

        <ul>
          <li>Add real ingredient names (in English)</li>
          <li>Add one ingredient at a time</li>
          <li>Select cuisine and meal type</li>
          <li>Click "Suggest Recipes" to begin</li>
        </ul>

        <button className="start-btn" onClick={onClose}>
          Start Cooking 🚀
        </button>

      </div>
    </div>
  );
}