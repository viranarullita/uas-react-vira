// src/context/RecipeProvider.jsx
import { useState, useEffect } from "react";
import { RecipeContext } from "./RecipeContext";
// import data resep bawaan (JSON)
import defaultRecipes from "../recipe.json"; 

export default function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [likes, setLikes] = useState({});

  // Ambil data dari localStorage + gabungkan dengan defaultRecipes
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};

    // ambil semua resep user dari localStorage
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

  // simpan resep yang dibuat user ke localStorage sesuai userId
  const simpanResepUser = (resep) => {
    const userId = resep.userId;
    const key = `recipes_${userId}`;
    const userRecipes = JSON.parse(localStorage.getItem(key)) || [];

    // cek jika resep sudah ada, update; jika belum, tambah
    const updatedRecipes = userRecipes.filter(r => r.id !== resep.id);
    updatedRecipes.push(resep);
    localStorage.setItem(key, JSON.stringify(updatedRecipes));

    // update state recipes agar AllRecipes langsung refresh
    setRecipes(prev => {
      const otherRecipes = prev.filter(r => r.id !== resep.id);
      return [...otherRecipes, resep];
    });
  };

  // toggle favorites
  const toggleFavorite = (recipeId, userId) => {
    setFavorites((prev) => {
      const userFavorites = prev[userId] || [];
      const updatedFavorites = userFavorites.includes(recipeId)
        ? userFavorites.filter((id) => id !== recipeId)
        : [...userFavorites, recipeId];

      const newFavs = { ...prev, [userId]: updatedFavorites };
      localStorage.setItem("favorites", JSON.stringify(newFavs)); // simpan ke localStorage
      return newFavs;
    });
  };

  // toggle likes
  const toggleLike = (recipeId, userId) => {
    setLikes((prev) => {
      const userLikes = prev[userId] || [];
      const updatedLikes = userLikes.includes(recipeId)
        ? userLikes.filter((id) => id !== recipeId)
        : [...userLikes, recipeId];

      const newLikes = { ...prev, [userId]: updatedLikes };
      localStorage.setItem("likes", JSON.stringify(newLikes)); // simpan ke localStorage
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
        simpanResepUser, // tambahkan function simpan resep user
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
