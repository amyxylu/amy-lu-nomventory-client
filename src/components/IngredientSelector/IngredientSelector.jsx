import { useState, useEffect } from "react";
import axios from "axios";
import "./IngredientSelector.scss";
import CloseIcon from "../../assets/icons/CloseIcon";

function IngredientSelector() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
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

  useEffect(() => {
    if (searchTerm) {
      const matches = ingredients.filter((ingredient) =>
        ingredient.ingredient_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredIngredients(matches);
    } else {
      setFilteredIngredients([]);
    }
  }, [searchTerm, ingredients]);

  const handleSelectIngredient = (ingredient) => {
    if (!selectedIngredients.some((item) => item.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
    setSearchTerm("");
    setFilteredIngredients([]);
  };

  const handleRemoveIngredient = (ingredientId) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item.id !== ingredientId)
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
    <div className="ingredient-selector">
      {loading && <p>Loading Ingredients...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="ingredient-selector__list">
        {selectedIngredients.map((ingredient) => (
          <li key={ingredient.id} className="ingredient-selector__list-item">
            {ingredient.ingredient_name}
            <button onClick={() => handleRemoveIngredient(ingredient.id)}>
              <CloseIcon />
            </button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Type an ingredient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="ingredient-selector__input"
      />

      {filteredIngredients.length > 0 && (
        <ul className="ingredient-selector__autocomplete">
          {filteredIngredients.map((ingredient) => (
            <li
              key={ingredient.id}
              onClick={() => handleSelectIngredient(ingredient)}
              className="ingredient-selector__autocomplete-item">
              {ingredient.ingredient_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IngredientSelector;
