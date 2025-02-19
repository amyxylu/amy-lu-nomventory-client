import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./RecipesPage.scss";

function RecipesPage() {
  const location = useLocation();
  const [recipes, setRecipes] = useState(location.state?.recipes || []);
  const [loading, setLoading] = useState(!location.state?.recipes);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state?.recipes) {
      const getAllRecipes = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/recipes`);
          setRecipes(response.data);
        } catch (err) {
          console.error("Error fetching all recipes:", err);
          setError("Failed to load recipes.");
        } finally {
          setLoading(false);
        }
      };
      getAllRecipes();
    }
  }, [location.state?.recipes]);

  return (
    <section className="recipes-page">
      <h1 className="recipes-page__header">
        {location.state?.recipes ? "Matching Recipes" : "All Recipes"}
      </h1>
      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipes-page__recipes">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecipesPage;
