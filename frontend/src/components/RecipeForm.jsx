import { useState } from "react";
import { fetchRecipes } from "../services/api";

export default function RecipeForm({ setRecipes, setLoading }) {

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [cuisine, setCuisine] = useState("Indian");
  const [foodType, setFoodType] = useState("Lunch");
  const [dietType, setDietType] = useState("veg");
  const [difficulty, setDifficulty] = useState("Easy");
  const [healthier, setHealthier] = useState(false);

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

    if (ingredients.length === 0) {
      alert("Please add at least one ingredient");
      return;
    }

    setLoading(true);

    const data = {
      ingredients,   // already array
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
      alert("Failed to fetch recipes");
    }

    setLoading(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      {/* Ingredient Chips */}
      <div className="ingredient-box">

        <div className="chips">
          {ingredients.map((item, index) => (
            <div key={index} className="chip">
              {item}
              <span onClick={() => removeIngredient(index)}>✕</span>
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
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option>South Indian</option>
          <option>North Indian</option>
          <option>Italian</option>
          <option>American</option>
          <option>Chinese</option>
          <option>Korean</option>
          <option>Japanese</option>
          <option>French</option>
          <option>Mexican</option>
        </select>

        <select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>
      </div>

      <div className="row">
        <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
          <option value="veg">Veg</option>
          <option value="non-veg">Non Veg</option>
        </select>

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={healthier}
          onChange={() => setHealthier(!healthier)}
        />
        Make it Healthier
      </label>

      <button type="submit">Suggest Recipes</button>
    </form>
  );
}