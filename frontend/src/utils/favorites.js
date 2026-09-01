// Favorites management using localStorage

const FAVORITES_KEY = "ai-cooking-favorites";

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error reading favorites:", error);
    return [];
  }
};

export const addFavorite = (recipe) => {
  try {
    const favorites = getFavorites();
    const recipeName = recipe.name || recipe.id;
    
    // Check if already exists
    if (!favorites.find(fav => fav.name === recipeName)) {
      const newFavorite = {
        ...recipe,
        addedAt: new Date().toISOString(),
        id: recipe.id || recipeName.toLowerCase().replace(/\s+/g, "-")
      };
      favorites.push(newFavorite);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
    return favorites;
  } catch (error) {
    console.error("Error adding favorite:", error);
    return [];
  }
};

export const removeFavorite = (recipeId) => {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter(fav => fav.id !== recipeId && fav.name !== recipeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Error removing favorite:", error);
    return [];
  }
};

export const isFavorite = (recipeId, recipeName) => {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === recipeId || fav.name === recipeName);
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
};
