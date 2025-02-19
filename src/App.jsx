import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import CuisinesPage from "./pages/CuisinesPage/CuisinesPage";
import CuisineRecipesPage from "./pages/CuisineRecipesPage/CuisineRecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage/RecipeDetailsPage";
import PreferencesPage from "./pages/PreferencesPage/PreferencesPage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
        <Route path="/cuisines" element={<CuisinesPage />} />
        <Route path="/cuisines/:cuisineType" element={<CuisineRecipesPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
