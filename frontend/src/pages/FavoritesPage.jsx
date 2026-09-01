import { useState, useEffect } from "react";
import { getFavorites } from "../utils/favorites";
import EmptyState from "../components/EmptyState";
import FavoriteButton from "../components/FavoriteButton";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const favs = getFavorites();
    setFavorites(favs);
    setFilteredFavorites(favs);
  }, []);

  useEffect(() => {
    const filtered = favorites.filter((recipe) =>
      recipe.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFavorites(filtered);
  }, [searchTerm, favorites]);

  const handleRemoveFavorite = (wasLiked, recipeToRemove) => {
    if (wasLiked) {
      return;
    }

    const recipeId = recipeToRemove?.id ?? recipeToRemove?.name;
    const nextFavorites = favorites.filter(
      (recipe) => (recipe.id ?? recipe.name) !== recipeId
    );

    setFavorites(nextFavorites);
    setFilteredFavorites(nextFavorites);
  };

  const handleRecipeClick = (recipe) => {
    sessionStorage.setItem("selectedRecipe", JSON.stringify(recipe));
    navigate(`/recipes/${recipe.id}`);
  };

  if (favorites.length === 0) {
    return (
      <div className="page">
        <EmptyState
          icon="❤️"
          title="No Saved Recipes Yet"
          message="Start creating recipes and add them to your favorites to see them here"
          actionText="Create Recipe"
          actionLink="/create"
        />
      </div>
    );
  }

  return (
    <div className="page favorites-page">
      <div className="page-container">
        <div className="results-header">
          <h1>Your Favorite Recipes</h1>
          <p className="results-subtitle">
            {favorites.length} saved recipe{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="🔍 Search favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length > 0 ? (
          <div className="recipes-grid">
            {filteredFavorites.map((recipe, index) => (
              <div
                key={recipe.id ?? recipe.name ?? `${recipe.name}-${index}`}
                className="recipe-result-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                {/* Card Header */}
                <div className="card-header">
                  <h3>{recipe.name}</h3>
                  <div onClick={(e) => e.stopPropagation()}>
                    <FavoriteButton
                      recipe={recipe}
                      onFavoriteChange={(isLiked, currentRecipe) =>
                        handleRemoveFavorite(isLiked, currentRecipe)
                      }
                    />
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

                {/* Saved Info */}
                {recipe.addedAt && (
                  <p className="saved-date">
                    Saved {new Date(recipe.addedAt).toLocaleDateString()}
                  </p>
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
            title="No favorites match your search"
            message="Try a different search term"
          />
        )}
      </div>
    </div>
  );
}
