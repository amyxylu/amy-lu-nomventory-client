import { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import "./IngredientSelector.scss";
import CloseIcon from "../../assets/icons/CloseIcon";
import PlusIcon from "../../assets/icons/PlusIcon";

function IngredientSelector({ selectedIngredients, setSelectedIngredients }) {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/ingredients`);
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
      const updatedIngredients = [...selectedIngredients, ingredient];
      setSelectedIngredients(updatedIngredients);
      localStorage.setItem(
        "selectedIngredients",
        JSON.stringify(updatedIngredients)
      );
    }
    setSearchTerm("");
    setFilteredIngredients([]);
  };

  const handleRemoveIngredient = (ingredientId) => {
    const updatedIngredients = selectedIngredients.filter(
      (item) => item.id !== ingredientId
    );
    setSelectedIngredients(updatedIngredients);
    localStorage.setItem(
      "selectedIngredients",
      JSON.stringify(updatedIngredients)
    );
  };

  return (
    <div className="ingredient-selector">
      {loading && <p>Loading Ingredients...</p>}
      {error && <p className="error">{error}</p>}

      <div className="ingredient-selector__input-container">
        <div className="ingredient-selector__selected">
          {selectedIngredients.map((ingredient) => (
            <span
              key={ingredient.id}
              className="ingredient-selector__selected-item">
              {ingredient.ingredient_name}
              <button
                onClick={() => handleRemoveIngredient(ingredient.id)}
                className="ingredient-selector__remove">
                <CloseIcon className="ingredient-selector__remove-icon" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type an ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ingredient-selector__input"
        />
      </div>

      {filteredIngredients.length > 0 && (
        <ul className="ingredient-selector__autocomplete">
          {filteredIngredients.map((ingredient) => (
            <li
              key={ingredient.id}
              onClick={() => handleSelectIngredient(ingredient)}
              className="ingredient-selector__autocomplete-item">
              <PlusIcon className="ingredient-selector__autocomplete-icon" />
              {ingredient.ingredient_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IngredientSelector;
