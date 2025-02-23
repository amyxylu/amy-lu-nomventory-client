import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import fullHeart from "../../assets/icons/heart-full.png";
import emptyHeart from "../../assets/icons/heart-empty.png";
import "./RecipeDetailsCard.scss";

function RecipeDetailsCard({ recipe, selectedIngredients, className = "" }) {
  const [cuisineName, setCuisineName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  if (!recipe) {
    return <p className="recipe-details__error">Recipe not found.</p>;
  }

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
      }
    };

    if (recipe?.cuisine_id) {
      getCuisineName();
    }
  }, [recipe?.cuisine_id]);

  const imageUrl = recipe?.image_url
    ? `${BASE_URL}${
        recipe.image_url.startsWith("/")
          ? recipe.image_url
          : `/${recipe.image_url}`
      }`
    : "/src/assets/images/fridge.jpg";

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/recipes/${recipe.id}/ingredients`
        );
        setIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    if (recipe?.id) {
      getIngredients();
    }
  }, [recipe?.id]);

  const selectedNames =
    selectedIngredients?.map((ing) => ing.ingredient_name.toLowerCase()) || [];

  const formatTextWithBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <article className={`recipe-details ${className}`}>
      <div className="recipe-details__img-container">
        <img
          src={imageUrl}
          alt={recipe.recipe_name}
          className="recipe-details__image"
        />
      </div>

      <div className="recipe-details__content">
        <h1 className="recipe-details__title">{recipe.recipe_name}</h1>
        <p className="recipe-details__cuisine">
          <strong>Cuisine:</strong> {cuisineName}
        </p>
        <p className="recipe-details__description">{recipe.description}</p>

        <ul className="recipe-details__list">
          <li className="recipe-details__list-detail">
            <strong>Difficulty:</strong> {recipe.difficulty_level}
          </li>
          <li className="recipe-details__list-detail">
            <strong>Prep Time:</strong> {recipe.prep_time} min
          </li>
          <li className="recipe-details__list-detail">
            <strong>Cook Time:</strong> {recipe.cook_time} min
          </li>
          <li className="recipe-details__list-detail">
            <strong>Servings:</strong> {recipe.servings}
          </li>
        </ul>

        <div className="recipe-details__ingredients">
          <h3 className="recipe-details__ingredients-header">Ingredients</h3>
          <ul className="recipe-details__ingredients-list">
            {ingredients.map((ingredient, index) => {
              const isAvailable = selectedNames.includes(
                ingredient.ingredient_name.toLowerCase()
              );
              return (
                <li key={index} className="recipe-details__ingredients-item">
                  <div className="recipe-details__ingredients-left">
                    <img
                      src={isAvailable ? fullHeart : emptyHeart}
                      alt={isAvailable ? "Available" : "Missing"}
                      className="recipe-details__ingredients-icon"
                    />
                    {ingredient.ingredient_name}
                  </div>
                  <div className="recipe-details__ingredients-right">
                    {ingredient.quantity} {ingredient.unit}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="recipe-details__instructions">
          <h3 className="recipe-details__instructions-header">Instructions</h3>
          {recipe.instructions.split("\n").map((step, index) => (
            <p key={index}>{formatTextWithBold(step)}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default RecipeDetailsCard;
