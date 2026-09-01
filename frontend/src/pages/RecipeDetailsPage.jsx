import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import EmptyState from "../components/EmptyState";

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

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

  if (!recipe) {
    return (
      <div className="page">
        <EmptyState
          icon="🍽️"
          title="Recipe Not Found"
          message="The recipe you're looking for doesn't exist"
          actionText="Back to Results"
          actionLink="/recipes"
        />
      </div>
    );
  }

  return (
    <div className="page recipe-details-page">
      <div className="page-container">
        {/* Back Button */}
        <Link to="/recipes" className="back-link">
          ← Back to Results
        </Link>

        {/* Recipe Header */}
        <div className="recipe-header">
          <div className="recipe-header-content">
            <h1>{recipe.name}</h1>
            <FavoriteButton recipe={{ ...recipe, id: recipe.index }} />
          </div>

          {/* Meta Info */}
          <div className="recipe-meta">
            {recipe.difficulty && (
              <div className="meta-item">
                <span className="meta-label">Difficulty</span>
                <span className={`badge difficulty-${recipe.difficulty?.toLowerCase()}`}>
                  {recipe.difficulty}
                </span>
              </div>
            )}

            {recipe.cuisine && (
              <div className="meta-item">
                <span className="meta-label">Cuisine</span>
                <span className="badge cuisine">{recipe.cuisine}</span>
              </div>
            )}

            {recipe.cookingTime && (
              <div className="meta-item">
                <span className="meta-label">Cooking Time</span>
                <span className="meta-value">⏱ {recipe.cookingTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="recipe-content-grid">
          {/* Left Column - Main Content */}
          <div className="recipe-main">
            {/* Description */}
            {recipe.shortRecipe && (
              <section className="recipe-section">
                <h2>About This Recipe</h2>
                <p className="recipe-description">{recipe.shortRecipe}</p>
              </section>
            )}

            {/* Ingredients */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <section className="recipe-section">
                <h2>Ingredients</h2>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                      <span className="checkbox">✓</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Instructions */}
            {recipe.instructions && recipe.instructions.length > 0 && (
              <section className="recipe-section">
                <h2>Cooking Instructions</h2>
                <ol className="instructions-list">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="instruction-item">
                      <span className="step-number">Step {index + 1}</span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <section className="recipe-section tips-section">
                <h2>💡 Cooking Tips</h2>
                <ul className="tips-list">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="tip-item">{tip}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <aside className="recipe-sidebar">
            {/* Missing Ingredients Card */}
            {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
              <div className="sidebar-card">
                <h3>⚠️ Missing Ingredients</h3>
                <div className="missing-items">
                  {recipe.missingIngredients.map((item, index) => (
                    <div key={index} className="missing-item">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Info Card */}
            <div className="sidebar-card">
              <h3>Quick Info</h3>
              <div className="quick-info">
                {recipe.difficulty && (
                  <div className="info-row">
                    <span>Difficulty:</span>
                    <strong>{recipe.difficulty}</strong>
                  </div>
                )}
                {recipe.cookingTime && (
                  <div className="info-row">
                    <span>Time:</span>
                    <strong>{recipe.cookingTime}</strong>
                  </div>
                )}
                {recipe.cuisine && (
                  <div className="info-row">
                    <span>Cuisine:</span>
                    <strong>{recipe.cuisine}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sidebar-actions">
              <Link to="/create" className="new-recipe-btn">
                Create Another Recipe
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
