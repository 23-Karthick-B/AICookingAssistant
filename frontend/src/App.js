import { useState } from "react";
import Header from "./components/Header";
import RecipeForm from "./components/RecipeForm";
import RecipeCard from "./components/RecipeCard";
import "./style.css";

function App() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <Header />
      <RecipeForm setRecipes={setRecipes} setLoading={setLoading} />

      {loading && <p className="loading">Cooking something delicious... 🔥</p>}

      <div className="grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default App;