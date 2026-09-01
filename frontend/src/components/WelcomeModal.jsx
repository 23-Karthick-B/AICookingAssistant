export default function WelcomeModal({ onClose }) {
  const benefits = [
    "Add ingredients in seconds",
    "Choose cuisine and meal mood",
    "Get tailored suggestions instantly"
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close welcome modal">
          ×
        </button>

        <div className="modal-badge">Chef's dashboard</div>
        <h2>🍳 Welcome to AI Cooking Assistant</h2>

        <p className="subtitle">
          Turn your ingredients into delicious recipes instantly.
        </p>

        <div className="modal-benefits">
          {benefits.map((item) => (
            <div key={item} className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button type="button" className="start-btn" onClick={onClose}>
          Start Cooking 🚀
        </button>
      </div>
    </div>
  );
}