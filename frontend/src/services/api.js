const API_BASE = process.env.REACT_APP_API_URL;

export async function fetchRecipes(data) {
  const response = await fetch(`${API_BASE}/api/recipe/suggest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Something went wrong");
  }

  return result;
}