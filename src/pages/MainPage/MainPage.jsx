import "./MainPage.scss";
import IngredientSelector from "../../components/IngredientSelector/IngredientSelector";

function MainPage() {
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
        <IngredientSelector />
      </article>
    </section>
  );
}

export default MainPage;
