import { useState } from "react";
import { fetchRecipes } from "../services/api";

export default function RecipeForm({ setRecipes, setLoading }) {

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

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

  const [cuisine, setCuisine] = useState("");
  const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);
  const [foodType, setFoodType] = useState("");
  const [dietType, setDietType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [healthier, setHealthier] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isFormValid =
  ingredients.length > 0 &&
  cuisine &&
  foodType &&
  dietType &&
  difficulty;

  // Add ingredient
  const addIngredient = () => {
    if (ingredientInput.trim() === "") return;

    // prevent duplicates
    if (ingredients.includes(ingredientInput.trim())) return;

    setIngredients([...ingredients, ingredientInput.trim()]);
    setIngredientInput("");
  };

  // Remove ingredient
  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
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
      setRecipes(result.recipes);
    } catch (error) {
      setRecipes([]);
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      {/* Ingredient Chips */}
      <div className="ingredient-box">

  <div className="chips-container">
      {ingredients.map((item, index) => (
        <div key={index} className="chip">
          <span>{item}</span>
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeIngredient(index)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>

    <div className="add-row">
      <input
        type="text"
        placeholder="Add ingredient"
        value={ingredientInput}
        onChange={(e) => setIngredientInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addIngredient();
          }
        }}
      />
      <button type="button" onClick={addIngredient}>
        +
      </button>
    </div>

  </div>

      <div className="row">
        <div className="autocomplete">
  <input
    type="text"
    placeholder="Type cuisine..."
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
            .filter(option =>
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

        <select
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          required
        >
          <option value="" disabled>Select meal type</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>
      </div>

      <div className="row">
        <select
          value={dietType}
          onChange={(e) => setDietType(e.target.value)}
          required
        >
          <option value="" disabled>Select diet type</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non Veg</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        >
          <option value="" disabled>Select difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <div className="action-row">
        <div className="toggle-row">
          <span>Make it Healthier</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={healthier}
              onChange={() => setHealthier(!healthier)}
            />
            <span className="slider"></span>
          </label>
        </div>
        {errorMessage && (
          <div className="error-box">
            ⚠ {errorMessage}
          </div>
        )}
        
        <button type="submit" disabled={!isFormValid}>
          Suggest Recipes
        </button>
      </div>
    </form>
  );
}