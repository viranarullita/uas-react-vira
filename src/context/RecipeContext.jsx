// src/context/RecipeContext.jsx
import { createContext, useContext } from "react";

// Definisi context
export const RecipeContext = createContext();

// Custom hook supaya gampang dipakai di komponen
export function useRecipe() {
  return useContext(RecipeContext);
}
