export const fetchRecipes = async (data) => {
  const response = await fetch("http://localhost:8080/api/recipe/suggest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};