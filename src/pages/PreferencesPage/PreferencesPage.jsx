import { useState, useEffect } from "react";
import IngredientSelector from "../../components/IngredientSelector/IngredientSelector";
import "./PreferencesPage.scss";

function PreferencesPage() {
  const [excludedIngredients, setExcludedIngredients] = useState(() => {
    const stored = localStorage.getItem("excludedIngredients");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "excludedIngredients",
      JSON.stringify(excludedIngredients)
    );
  }, [excludedIngredients]);

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
      </article>
    </section>
  );
}

export default PreferencesPage;
