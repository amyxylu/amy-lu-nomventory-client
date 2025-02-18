import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage/RecipeDetailsPage";
import PreferencesPage from "./pages/PreferencesPage/PreferencesPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
        <Route path="/cuisines" element="" />
        <Route path="/cuisines/:cuisineType" element="" />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
