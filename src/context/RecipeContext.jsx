import { createContext, useContext } from "react";

// Membuat Context untuk menyimpan data global resep
export const RecipeContext = createContext();

// Custom Hook untuk memudahkan akses ke RecipeContext
export function useRecipe() {
  return useContext(RecipeContext);
}