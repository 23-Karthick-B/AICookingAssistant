import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from "../services/api";
import LoadingState from "../components/LoadingState";
import IngredientChip from "../components/IngredientChip";

export default function CreateRecipePage() {
  const navigate = useNavigate();

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);
  const [foodType, setFoodType] = useState("");
  const [dietType, setDietType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [healthier, setHealthier] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cuisineOptions = [
    "South Indian",
    "North Indian",
    "Italian",
    "American",
    "Chinese",
    "Korean",
    "Japanese",
    "French",
    "Mexican"
  ];

  const quickSuggestions = [
    "Tomato",
    "Onion",
    "Garlic",
    "Spinach",
    "Paneer",
    "Rice",
    "Eggs",
    "Chicken",
    "Lemon",
    "Basil",
    "Potato",
    "Bell Pepper"
  ];

  const isFormValid =
    ingredients.length > 0 && cuisine && foodType && dietType && difficulty;

  const normalizeIngredient = (value) =>
    value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);

  const addIngredient = () => {
    const parsedIngredients = normalizeIngredient(ingredientInput);
    if (parsedIngredients.length === 0) return;

    const freshItems = parsedIngredients.filter(
      (item) => !ingredients.some((existing) => existing.toLowerCase() === item.toLowerCase())
    );

    if (freshItems.length === 0) {
      setIngredientInput("");
      return;
    }

    setIngredients((prev) => [...prev, ...freshItems]);
    setIngredientInput("");
  };

  const addSuggestedIngredient = (item) => {
    if (ingredients.some((existing) => existing.toLowerCase() === item.toLowerCase())) {
      return;
    }
    setIngredients((prev) => [...prev, item]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const data = {
      ingredients,
      cuisine,
      foodType,
      dietType,
      healthier,
      difficulty
    };

    try {
      const result = await fetchRecipes(data);
      sessionStorage.setItem("generatedRecipes", JSON.stringify(result.recipes));
      navigate("/recipes");
    } catch (error) {
      setErrorMessage(error.message || "Failed to generate recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="page create-recipe-page">
      <div className="page-container">
        <h1>Create Your Recipe</h1>
        <p className="page-subtitle">Tell us what you have and we'll suggest delicious recipes</p>

        <form className="recipe-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Ingredients</h2>
            <p className="section-hint">Add the ingredients you have available</p>

            <div className="ingredients-input-group">
              <input
                type="text"
                placeholder="Enter ingredient name or separate with commas..."
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addIngredient();
                  }
                }}
                className="ingredient-input"
              />
              <button
                type="button"
                onClick={addIngredient}
                className="add-ingredient-btn"
              >
                + Add
              </button>
            </div>

            <div className="ingredient-suggestion-list">
              {quickSuggestions
                .filter(
                  (item) =>
                    item.toLowerCase().includes(ingredientInput.trim().toLowerCase()) ||
                    ingredientInput.trim() === ""
                )
                .slice(0, 8)
                .map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`ingredient-suggestion ${ingredients.some((existing) => existing.toLowerCase() === item.toLowerCase()) ? "selected" : ""}`}
                    onClick={() => addSuggestedIngredient(item)}
                  >
                    {item}
                  </button>
                ))}
            </div>

            <div className="ingredients-chips">
              {ingredients.map((item, index) => (
                <IngredientChip
                  key={index}
                  ingredient={item}
                  onRemove={() => removeIngredient(index)}
                />
              ))}
            </div>

            {ingredients.length > 0 && (
              <p className="ingredients-count">
                {ingredients.length} ingredient{ingredients.length !== 1 ? "s" : ""} added
              </p>
            )}
          </div>

          <div className="form-section">
            <h2>Your Preferences</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Cuisine</label>
                <div className="autocomplete">
                  <input
                    type="text"
                    placeholder="Select cuisine..."
                    value={cuisine}
                    onChange={(e) => {
                      setCuisine(e.target.value);
                      setShowCuisineDropdown(true);
                    }}
                    onFocus={() => setShowCuisineDropdown(true)}
                  />

                  {showCuisineDropdown && (
                    <div className="dropdown">
                      {cuisineOptions
                        .filter((option) =>
                          option.toLowerCase().includes(cuisine.toLowerCase())
                        )
                        .map((option, index) => (
                          <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                              setCuisine(option);
                              setShowCuisineDropdown(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Meal Type</label>
                <select
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                >
                  <option value="">Select meal type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>

              <div className="form-group">
                <label>Diet Type</label>
                <select
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                >
                  <option value="">Select diet type</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                </select>
              </div>

              <div className="form-group">
                <label>Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="form-group toggle-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={healthier}
                  onChange={(e) => setHealthier(e.target.checked)}
                />
                <span className="toggle-text">Make it healthier</span>
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="error-message">
              ⚠️ {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid}
            className="submit-btn"
          >
            {loading ? "Generating..." : "Suggest Recipes 🎉"}
          </button>
        </form>
      </div>
    </div>
  );
}
