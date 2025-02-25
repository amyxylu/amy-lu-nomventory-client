import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fridge from "/src/assets/images/fridge.jpg";
import bounce from "/src/assets/images/Bounce.gif";
import { BASE_URL } from "../../config";
import "./MainPage.scss";
import IngredientSelector from "../../components/IngredientSelector/IngredientSelector";

function MainPage() {
  const navigate = useNavigate();

  const [selectedIngredients, setSelectedIngredients] = useState(() => {
    const stored = localStorage.getItem("selectedIngredients");
    return stored ? JSON.parse(stored) : [];
  });

  const [excludedIngredients, setExcludedIngredients] = useState(() => {
    const stored = localStorage.getItem("excludedIngredients");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "selectedIngredients",
      JSON.stringify(selectedIngredients)
    );
  }, [selectedIngredients]);

  const handleSearchRecipes = async () => {
    try {
      const ingredientIds = selectedIngredients.map(
        (ingredient) => ingredient.id
      );
      const excludedIds = excludedIngredients.map(
        (ingredient) => ingredient.id
      );

      let response;
      if (ingredientIds.length === 0) {
        response = await axios.get(`${BASE_URL}/api/recipes`);
      } else {
        response = await axios.post(`${BASE_URL}/api/filters/recipes`, {
          ingredients: ingredientIds,
          excludeIngredients: excludedIds,
        });
      }

      navigate("/recipes", {
        state: { recipes: response.data, selectedIngredients },
      });
    } catch (err) {
      console.error("Error fetching recipes:", err);
      alert("Failed to fetch recipes. Please try again.");
    }
  };

  return (
    <section className="main-page">
      <article className="main-page__hero">
        <img src={fridge} className="main-page__hero-img" />
        <img src={bounce} className="main-page__hero-sticker" />
      </article>
      <article className="main-page__content">
        <h1 className="main-page__content-title">Select your ingredients:</h1>
        <IngredientSelector
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
        <div className="main-page__btn-container">
          <button
            onClick={handleSearchRecipes}
            className="main-page__search-btn">
            Find My Recipes!
          </button>
        </div>
      </article>
    </section>
  );
}

export default MainPage;
