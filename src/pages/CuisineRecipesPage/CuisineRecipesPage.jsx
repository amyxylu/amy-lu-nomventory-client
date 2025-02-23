import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./CuisineRecipesPage.scss";

function CuisineRecipesPage() {
  const { cuisineId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [cuisineName, setCuisineName] = useState("");
  const [cuisineImage, setCuisineImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCuisineRecipes = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/cuisines/${cuisineId}/recipes`
        );
        setRecipes(response.data);

        const cuisineResponse = await axios.get(
          `${BASE_URL}/api/cuisines/${cuisineId}`
        );
        setCuisineName(cuisineResponse.data.cuisine_name);

        setCuisineImage(
          cuisineResponse.data.image_url
            ? `${BASE_URL}${
                cuisineResponse.data.image_url.startsWith("/")
                  ? cuisineResponse.data.image_url
                  : `/${cuisineResponse.data.image_url}`
              }`
            : "./src/assets/images/cooking_mascot.jpg"
        );
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes.");
      } finally {
        setLoading(false);
      }
    };

    getCuisineRecipes();
  }, [cuisineId]);

  return (
    <section className="cuisine-recipes-page">
      <h1 className="cuisine-recipes-page__header">
        {cuisineName ? `${cuisineName} Recipes` : "Recipes"}
      </h1>

      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found for this cuisine.</p>
      ) : (
        <div className="cuisine-recipes-page__content">
          {cuisineImage && (
            <div className="cuisine-recipes-page__image-container">
              <img
                src={cuisineImage}
                alt={cuisineName}
                className="cuisine-recipes-page__image"
              />
            </div>
          )}

          <div className="cuisine-recipes-page__recipes">
            {recipes.length === 0 ? (
              <p>No recipes found for this cuisine.</p>
            ) : (
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  className="recipe-card--cuisine"
                />
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default CuisineRecipesPage;
