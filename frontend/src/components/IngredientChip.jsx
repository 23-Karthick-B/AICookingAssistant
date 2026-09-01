export default function IngredientChip({ ingredient, onRemove }) {
  return (
    <div className="ingredient-chip">
      <span>{ingredient}</span>
      {onRemove && (
        <button type="button" className="chip-remove-btn" onClick={onRemove}>
          ✕
        </button>
      )}
    </div>
  );
}
