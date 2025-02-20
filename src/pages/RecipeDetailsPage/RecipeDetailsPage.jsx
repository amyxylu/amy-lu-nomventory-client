import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import axios from "axios";
import RecipeDetailsCard from "../../components/RecipeDetailsCard/RecipeDetailsCard";
import "./RecipeDetailsPage.scss";

function RecipeDetailsPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe.");
      }
    };

    getRecipe();
  }, [recipeId]);

  return (
    <section className="recipe-details-page">
      {/* <h1 className="recipe-details-page__header">{recipe.recipe_name}</h1> */}
      {error ? (
        <p className="recipe-details-page__error">{error}</p>
      ) : recipe ? (
        <RecipeDetailsCard recipe={recipe} />
      ) : (
        <p className="recipe-details-page__loading">Loading...</p>
      )}
    </section>
  );
}

export default RecipeDetailsPage;
