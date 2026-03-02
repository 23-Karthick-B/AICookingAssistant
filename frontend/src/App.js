import { useState } from "react";
import Header from "./components/Header";
import RecipeForm from "./components/RecipeForm";
import RecipeCard from "./components/RecipeCard";
import WelcomeModal from "./components/WelcomeModal";
import "./style.css";

function App() {

  const [showWelcome, setShowWelcome] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* Welcome Modal */}
      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}

      <div className="app-container">
        <Header />

        {/* Pass props properly */}
        <RecipeForm 
          setRecipes={setRecipes} 
          setLoading={setLoading} 
        />

        {/* Loading message */}
        {loading && (
          <p className="loading">
            Cooking something delicious... 🔥
          </p>
        )}

        {/* Recipe Results */}
        <div className="grid">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>

      </div>
    </>
  );
}

export default App;