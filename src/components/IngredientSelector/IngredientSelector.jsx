import { useState, useEffect } from "react";
import axios from "axios";
import "./IngredientSelector.scss";

function IngredientSelector() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/ingredients"
        );
        setIngredients(response.data);
      } catch (err) {
        setError("Failed to retrieve ingredients");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getIngredients();
  }, []);

  return (
    <div className="ingredients">
      {loading && <p>Loading Ingredients...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="ingredient__list">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className="ingredient__list-item">
            {ingredient.ingredient_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientSelector;
