import { useState, useEffect } from "react";
import { RecipeContext } from "./RecipeContext";
import defaultRecipes from "../recipe.json";

function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    
    const allUserRecipes = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("recipes_")) {
        const data = JSON.parse(localStorage.getItem(key)) || [];
        allUserRecipes.push(...data);
      }
    });

    const combinedRecipes = [...defaultRecipes, ...allUserRecipes];

    setRecipes(combinedRecipes);
    setFavorites(savedFavorites);
    setLikes(savedLikes);
  }, []); 

  // Fungsi untuk menyimpan resep yang dibuat oleh pengguna ke localStorage
  const simpanResepUser = (resep) => {
    const userId = resep.userId;
    const key = `recipes_${userId}`;
    const userRecipes = JSON.parse(localStorage.getItem(key)) || [];

    const updatedRecipes = userRecipes.filter(r => r.id !== resep.id);
    updatedRecipes.push(resep);
    localStorage.setItem(key, JSON.stringify(updatedRecipes));

    setRecipes(prev => {
      const otherRecipes = prev.filter(r => r.id !== resep.id);
      return [...otherRecipes, resep];
    });
  };

  const toggleFavorite = (recipeId, userId) => {
    setFavorites((prev) => {
      const userFavorites = prev[userId] || [];
      const updatedFavorites = userFavorites.includes(recipeId)
        ? userFavorites.filter((id) => id !== recipeId)
        : [...userFavorites, recipeId];

      const newFavs = { ...prev, [userId]: updatedFavorites };
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const toggleLike = (recipeId, userId) => {
    setLikes((prev) => {
      const userLikes = prev[userId] || [];
      const updatedLikes = userLikes.includes(recipeId)
        ? userLikes.filter((id) => id !== recipeId)
        : [...userLikes, recipeId];

      const newLikes = { ...prev, [userId]: updatedLikes };
      localStorage.setItem("likes", JSON.stringify(newLikes));
      return newLikes;
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        favorites,
        likes,
        toggleFavorite,
        toggleLike,
        simpanResepUser,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;