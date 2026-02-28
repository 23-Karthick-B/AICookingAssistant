export default function RecipeCard({ recipe }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{recipe.name}</h3>
        <span className={`badge ${recipe.difficulty.toLowerCase()}`}>
          {recipe.difficulty}
        </span>
      </div>

      <p className="time">⏱ {recipe.cookingTime}</p>

      <p>{recipe.shortRecipe}</p>

      <h4>Missing Ingredients</h4>
      <ul>
        {recipe.missingIngredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}