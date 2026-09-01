import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

export default function CookingModePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    // Get recipe from sessionStorage
    const stored = sessionStorage.getItem("selectedRecipe");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecipe(parsed);
      } catch (error) {
        console.error("Error parsing recipe:", error);
      }
    }
  }, [id]);

  // Timer effect
  useEffect(() => {
    if (!timerActive || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  if (!recipe) {
    return (
      <div className="page">
        <EmptyState
          icon="👨‍🍳"
          title="Recipe Not Found"
          message="The recipe you're trying to cook doesn't exist"
          actionText="Back to Recipes"
          actionLink="/recipes"
        />
      </div>
    );
  }

  const instructions = recipe.instructions || [];
  const hasNextStep = currentStep < instructions.length - 1;
  const hasPrevStep = currentStep > 0;

  const handleCompleteStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (hasNextStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSetTimer = (minutes) => {
    setTimeRemaining(minutes * 60);
    setTimerActive(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((currentStep + 1) / instructions.length) * 100;

  return (
    <div className="page cooking-mode-page">
      <div className="cooking-container">
        {/* Header */}
        <div className="cooking-header">
          <div>
            <h1>{recipe.name}</h1>
            <p className="cooking-subtitle">{recipe.difficulty} • {recipe.cookingTime}</p>
          </div>
          <Link to={`/recipes/${recipe.index}`} className="close-cooking-btn">
            ✕
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="cooking-progress">
          <div className="progress-info">
            <span>Step {currentStep + 1} of {instructions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Main Cooking Area */}
        <div className="cooking-main">
          {/* Step Content */}
          <div className="step-content">
            <div className="step-number-large">
              Step {currentStep + 1}
            </div>
            <div className="step-instruction">
              {instructions[currentStep]}
            </div>

            {/* Step Status */}
            <div className="step-status">
              {completedSteps.includes(currentStep) && (
                <div className="completed-badge">✓ Completed</div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="cooking-sidebar">
            {/* Timer Section */}
            <div className="timer-section">
              <h3>⏱ Timer</h3>
              <div className="timer-display">
                {formatTime(timeRemaining)}
              </div>
              <div className="timer-buttons">
                <button
                  className="timer-btn"
                  onClick={() => handleSetTimer(5)}
                  disabled={timerActive}
                >
                  5 min
                </button>
                <button
                  className="timer-btn"
                  onClick={() => handleSetTimer(10)}
                  disabled={timerActive}
                >
                  10 min
                </button>
                <button
                  className="timer-btn"
                  onClick={() => handleSetTimer(15)}
                  disabled={timerActive}
                >
                  15 min
                </button>
              </div>
              {timerActive && (
                <button
                  className="timer-stop-btn"
                  onClick={() => setTimerActive(false)}
                >
                  Stop Timer
                </button>
              )}
            </div>

            {/* Ingredients Checklist */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="ingredients-section">
                <h3>✓ Ingredients</h3>
                <div className="ingredients-checklist">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="checklist-item">
                      <span className="checkmark">✓</span>
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="cooking-navigation">
          <button
            className="nav-btn prev-btn"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={!hasPrevStep}
          >
            ← Previous
          </button>

          <div className="step-dots">
            {instructions.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentStep ? "active" : ""} ${
                  completedSteps.includes(index) ? "completed" : ""
                }`}
                onClick={() => setCurrentStep(index)}
                title={`Step ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="nav-btn next-btn"
            onClick={handleCompleteStep}
          >
            {hasNextStep ? "Next →" : "Finish 🎉"}
          </button>
        </div>

        {/* Finished Screen */}
        {currentStep === instructions.length - 1 && completedSteps.includes(currentStep) && (
          <div className="finished-overlay">
            <div className="finished-card">
              <div className="finished-icon">🎉</div>
              <h2>Cooking Complete!</h2>
              <p>You've successfully cooked {recipe.name}</p>
              <div className="finished-actions">
                <Link to={`/recipes/${recipe.index}`} className="finished-btn">
                  View Recipe
                </Link>
                <Link to="/recipes" className="finished-btn secondary">
                  Find Another Recipe
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
