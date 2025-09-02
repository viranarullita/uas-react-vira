import { createContext, useContext } from "react";

export const RecipeContext = createContext();

export function useRecipe() {
  return useContext(RecipeContext);
}