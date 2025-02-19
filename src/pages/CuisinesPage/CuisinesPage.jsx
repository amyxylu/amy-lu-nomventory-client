import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import CuisineCard from "../../components/CuisineCard/CuisineCard";
import "./CuisinesPage.scss";

function CuisinesPage() {
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    const getCuisines = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/cuisines`);
        setCuisines(response.data);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
        setCuisines([]);
      }
    };
    getCuisines();
  }, []);

  return (
    <section className="cuisines-page">
      <h1 className="cuisines-page__header">Choose Your Cuisine!</h1>
      <ul className="cuisines-page__list">
        {cuisines.map((cuisine) => (
          <CuisineCard key={cuisines.id} cuisine={cuisine} />
        ))}
      </ul>
    </section>
  );
}

export default CuisinesPage;
