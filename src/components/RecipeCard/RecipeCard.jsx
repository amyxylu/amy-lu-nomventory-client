import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { BASE_URL } from "../../config";
import axios from "axios";
import "./RecipeCard.scss";

function RecipeCard({ recipe, className = "" }) {
  const location = useLocation();
  const selectedIngredients = location.state?.selectedIngredients || [];

  const [cuisineName, setCuisineName] = useState("");

  useEffect(() => {
    const getCuisineName = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/cuisines`);
        const cuisines = response.data;

        const matchedCuisine = cuisines.find(
          (cuisine) => cuisine.id === recipe.cuisine_id
        );
        setCuisineName(
          matchedCuisine ? matchedCuisine.cuisine_name : "Unknown Cuisine"
        );
      } catch (error) {
        console.error("Error fetching cuisines:", error);
        setCuisineName("?");
      }
    };
    getCuisineName();
  }, [recipe.cuisine_id]);

  const imageUrl = recipe.image_url
    ? `${BASE_URL}${
        recipe.image_url.startsWith("/")
          ? recipe.image_url
          : `/${recipe.image_url}`
      }`
    : "/src/assets/images/fridge.jpg";

  const totalCookTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <article className={`recipe-card ${className}`}>
      <Link
        to={`/recipes/${recipe.id}`}
        state={{ recipe, selectedIngredients }}
        className="recipe-card__link">
        <div className="recipe-card__image-container">
          {recipe.image_url && (
            <img
              src={imageUrl}
              alt={recipe.recipe_name}
              className="recipe-card__image"
            />
          )}
        </div>
        <div className="recipe-card__content">
          <h3 className="recipe-card__header">{recipe.recipe_name}</h3>
          <ul className="recipe-card__metadata">
            <li className="recipe-card__tag">{totalCookTime} min</li>
            <li className="recipe-card__tag">{recipe.difficulty_level}</li>
            <li className="recipe-card__tag">{cuisineName}</li>
          </ul>
          <p className="recipe-card__description">{recipe.description}</p>
          {recipe.match_percentage !== undefined && (
            <div className="recipe-card__progress">
              <p>Match: {recipe.match_percentage}%</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${recipe.match_percentage}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

export default RecipeCard;
