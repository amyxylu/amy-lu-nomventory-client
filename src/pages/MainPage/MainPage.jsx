import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MainPage.scss";
import IngredientSelector from "../../components/IngredientSelector/IngredientSelector";

function MainPage() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedExcluded = localStorage.getItem("excludedIngredients");
    if (storedExcluded) {
      setExcludedIngredients(JSON.parse(storedExcluded));
    }
  }, []);

  const handleSearchRecipes = async () => {
    try {
      const ingredientIds = selectedIngredients.map(
        (ingredient) => ingredient.id
      );
      const excludedIds = excludedIngredients.map(
        (ingredient) => ingredient.id
      );
      if (ingredientIds.length === 0) {
        alert("Please select at least one ingredient.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/filters/recipes",
        {
          ingredients: ingredientIds,
          excludeIngredients: excludedIds,
        }
      );

      navigate("/recipes", { state: { recipes: response.data } });
    } catch (err) {
      console.error("Error fetching recipes:", err);
      alert("Failed to fetch recipes. Please try again.");
    }
  };

  return (
    <section className="main-page">
      <article className="main-page__hero">
        <img
          src="/src/assets/images/fridge.jpg"
          className="main-page__hero-img"
        />
      </article>
      <article className="main-page__content">
        <h1 className="main-page__content-title">Select your ingredients:</h1>
        <IngredientSelector
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
        <button onClick={handleSearchRecipes} className="main-page__search-btn">
          Find My Recipes!
        </button>
      </article>
    </section>
  );
}

export default MainPage;
