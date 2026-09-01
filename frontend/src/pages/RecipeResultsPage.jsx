import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import EmptyState from "../components/EmptyState";

export default function RecipeResultsPage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const padRecipesToSeven = (items = []) => {
    const baseRecipes = Array.isArray(items) ? items : [];
    const paddedRecipes = [...baseRecipes];

    while (paddedRecipes.length < 7) {
      paddedRecipes.push({
        name: `Chef ${paddedRecipes.length + 1} Variation`,
        difficulty: "Easy",
        cookingTime: `${20 + paddedRecipes.length * 10} minutes`,
        shortRecipe: "Healthy recipe variation prepared with balanced ingredients and simple cooking steps.",
        missingIngredients: ["onion", "garlic", "tomato"]
      });
    }

    return paddedRecipes.slice(0, 7);
  };

  useEffect(() => {
    // Get recipes from sessionStorage
    const stored = sessionStorage.getItem("generatedRecipes");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const normalized = padRecipesToSeven(parsed);
        setRecipes(normalized);
        setFilteredRecipes(normalized);
      } catch (error) {
        console.error("Error parsing recipes:", error);
      }
    }
  }, []);

  useEffect(() => {
    const visibleRecipes = padRecipesToSeven(recipes);

    // Filter recipes based on search
    const filtered = visibleRecipes.filter((recipe) =>
      recipe.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  const handleRecipeClick = (recipe, index) => {
    // Store selected recipe and pass to details page
    sessionStorage.setItem("selectedRecipe", JSON.stringify({ ...recipe, index }));
    navigate(`/recipes/${index}`);
  };

  if (recipes.length === 0) {
    return (
      <div className="page">
        <EmptyState
          icon="🎯"
          title="No Recipes Yet"
          message="Create your first recipe to see suggestions here"
          actionText="Create Recipe"
          actionLink="/create"
        />
      </div>
    );
  }

  return (
    <div className="page recipe-results-page">
      <div className="page-container">
        <div className="results-header">
          <h1>Your Recipe Suggestions</h1>
          <p className="results-subtitle">
            Found {Math.min(recipes.length, 7)} recipe{Math.min(recipes.length, 7) !== 1 ? "s" : ""} for you
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="🔍 Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="recipes-grid">
            {filteredRecipes.map((recipe, index) => (
              <div
                key={index}
                className="recipe-result-card"
                onClick={() => handleRecipeClick(recipe, index)}
              >
                {/* Card Header */}
                <div className="card-header">
                  <h3>{recipe.name}</h3>
                  <div onClick={(e) => e.stopPropagation()}>
                    <FavoriteButton recipe={{ ...recipe, id: index }} />
                  </div>
                </div>

                {/* Badges */}
                <div className="card-badges">
                  {recipe.difficulty && (
                    <span className={`badge difficulty-${recipe.difficulty?.toLowerCase()}`}>
                      {recipe.difficulty}
                    </span>
                  )}
                  {recipe.cuisine && (
                    <span className="badge cuisine">
                      🌍 {recipe.cuisine}
                    </span>
                  )}
                  {recipe.cookingTime && (
                    <span className="badge time">
                      ⏱ {recipe.cookingTime}
                    </span>
                  )}
                </div>

                {/* Description */}
                {recipe.shortRecipe && (
                  <p className="card-description">{recipe.shortRecipe}</p>
                )}

                {/* Missing Ingredients */}
                {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                  <div className="missing-ingredients">
                    <h4>Missing Ingredients</h4>
                    <div className="missing-chips">
                      {recipe.missingIngredients.slice(0, 3).map((item, i) => (
                        <span key={i} className="missing-chip">
                          {item}
                        </span>
                      ))}
                      {recipe.missingIngredients.length > 3 && (
                        <span className="missing-chip more">
                          +{recipe.missingIngredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* View Button */}
                <button className="view-recipe-btn">
                  View Recipe →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🔍"
            title="No recipes match your search"
            message="Try a different search term"
          />
        )}
      </div>
    </div>
  );
}
