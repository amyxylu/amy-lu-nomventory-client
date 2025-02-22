import { useState, useEffect } from "react";
import IngredientSelector from "../../components/IngredientSelector/IngredientSelector";
import "./PreferencesPage.scss";

function PreferencesPage() {
  const [excludedIngredients, setExcludedIngredients] = useState([]);

  useEffect(() => {
    const storedExcluded = localStorage.getItem("excludedIngredients");
    if (storedExcluded) {
      setExcludedIngredients(JSON.parse(storedExcluded));
    }
  }, []);

  const handleSavePreferences = () => {
    localStorage.setItem(
      "excludedIngredients",
      JSON.stringify(excludedIngredients)
    );
    alert("Preferences saved! Recipes will now exclude selected ingredients.");
  };

  return (
    <section className="preferences-page">
      <article className="preferences-page__content">
        <h1 className="preferences-page__title">Ingredient Preferences</h1>
        <p className="preferences-page__description">
          Allergic? Or just find the ingredient plain yucky?
        </p>
        <p className="preferences-page__description">
          Select ingredients you want to exclude from your recipe searches!
        </p>

        <IngredientSelector
          selectedIngredients={excludedIngredients}
          setSelectedIngredients={setExcludedIngredients}
        />
        <div className="preferences-page__btn-container">
          <button
            onClick={handleSavePreferences}
            className="preferences-page__save-btn">
            Save Preferences
          </button>
        </div>
      </article>
    </section>
  );
}

export default PreferencesPage;
