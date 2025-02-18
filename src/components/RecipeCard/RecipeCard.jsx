import "./RecipeCard.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function RecipeCard({ recipe }) {
  const imageUrl = recipe.image_url
    ? `${BASE_URL}${
        recipe.image_url.startsWith("/")
          ? recipe.image_url
          : `/${recipe.image_url}`
      }`
    : "/src/assets/images/fridge.jpg";

  return (
    <article className="recipe-card">
      {recipe.image_url && (
        <img
          src={imageUrl}
          alt={recipe.recipe_name}
          className="recipe-card__image"
        />
      )}
    </article>
  );
}

export default RecipeCard;
