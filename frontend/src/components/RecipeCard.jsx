export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">

      <div className="card-header">
        <h3>{recipe.name}</h3>
        <span className={`badge ${recipe.difficulty?.toLowerCase()}`}>
          {recipe.difficulty}
        </span>
      </div>

      <div className="time">
        ⏱ {recipe.cookingTime}
      </div>

      <p className="recipe-steps">{recipe.shortRecipe}</p>

      <div className="missing-section">
        <h4>Missing Ingredients</h4>
        <div className="missing-chips">
          {recipe.missingIngredients?.map((item, index) => (
            <span key={index} className="missing-chip">
              {item}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}