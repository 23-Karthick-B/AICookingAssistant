export default function LoadingState() {
  return (
    <div className="loading-state">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <h2>👨‍🍳 Chef AI is preparing your recipes...</h2>
      <p>This may take a moment while our AI works its magic</p>
    </div>
  );
}
