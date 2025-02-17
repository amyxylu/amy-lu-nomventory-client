import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element="" />
        <Route path="/recipes" element="" />
        <Route path="/recipes/:recipeId" element="" />
        <Route path="/settings" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
