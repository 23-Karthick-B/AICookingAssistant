import { useState } from "react";
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";

export default function FavoriteButton({ recipe, onFavoriteChange }) {
  const [liked, setLiked] = useState(() =>
    isFavorite(recipe.id, recipe.name)
  );

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      removeFavorite(recipe.id || recipe.name);
    } else {
      addFavorite(recipe);
    }

    const nextLiked = !liked;
    setLiked(nextLiked);

    if (onFavoriteChange) {
      onFavoriteChange(nextLiked, recipe);
    }
  };

  return (
    <button
      className={`favorite-btn ${liked ? "liked" : ""}`}
      onClick={handleToggleFavorite}
      title={liked ? "Remove from favorites" : "Add to favorites"}
    >
      {liked ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
