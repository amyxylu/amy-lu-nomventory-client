import { useState, useEffect } from "react";
import axios from "axios";
import "./IngredientSelector.scss";

function IngredientSelector() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/ingredients"
        );

        const sortedIngredients = response.data.sort((a, b) =>
          a.ingredient_name.localeCompare(b.ingredient_name)
        );
        setIngredients(sortedIngredients);
      } catch (err) {
        setError("Failed to retrieve ingredients");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getIngredients();
  }, []);

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient.id)
        ? prev.filter((id) => id !== ingredient.id)
        : [...prev, ingredient.id]
    );
  };

  //   const getRecipesByIngredients = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:8080/api/recipes", {
  //         ingredients: selectedIngredients,
  //       });
  //       console.log("Recipes:", response.data);
  //     } catch (err) {
  //       console.error("Error fetching recipes:", err);
  //     }
  //   };

  return (
    <div className="ingredients">
      {loading && <p>Loading Ingredients...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="ingredients__list">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className={`ingredients__list-item ${
              selectedIngredients.includes(ingredient.id)
                ? "ingredients__list-item--selected"
                : ""
            }`}
            onClick={() => handleSelectIngredient(ingredient)}>
            {ingredient.ingredient_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientSelector;
