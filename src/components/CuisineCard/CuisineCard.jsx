import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";
import "./CuisineCard.scss";

function CuisineCard({ cuisine }) {
  const imageUrl = cuisine.image_url
    ? `${BASE_URL}${
        cuisine.image_url.startsWith("/")
          ? cuisine.image_url
          : `/${cuisine.image_url}`
      }`
    : "./src/assets/images/cooking_mascot.jpg";

  return (
    <li className="cuisine-card">
      <Link to={`/cuisines/${cuisine.id}`} className="cuisine-card__link">
        <div className="cuisine-card__top">
          <img
            src={imageUrl}
            alt={cuisine.cuisine_name}
            className="cuisine-card__image"
          />
        </div>
        <div className="cuisine-card__bottom">
          <h3 className="cuisine-card__header">{cuisine.cuisine_name}</h3>
        </div>
      </Link>
    </li>
  );
}

export default CuisineCard;
