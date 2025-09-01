import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import Home from "./pages/Home.jsx";
import AllRecipes from "./pages/AllRecipes.jsx";
import About from "./pages/About.jsx";
import Favorites from "./pages/Favorites.jsx";
import MyRecipes from "./pages/MyRecipes.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import Login from "./pages/Login.jsx";
import Registrasi from "./pages/Registrasi.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import RecipeProvider from "./context/RecipeProvider.jsx";

// Mengatur konfigurasi router menggunakan `createBrowserRouter`
const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Registrasi /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> }, 
      { path: "all-recipes", element: <AllRecipes /> },
      { path: "about", element: <About /> },
      { path: "favorites", element: <Favorites /> },
      { path: "my-recipes", element: <MyRecipes /> },
      { path: "recipe/:id", element: <RecipeDetails /> },
    ],
  },
]);

// Merender aplikasi ke DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Menggunakan RecipeProvider untuk menyediakan data global */}
    <RecipeProvider>
      <RouterProvider router={router} />
    </RecipeProvider>
  </StrictMode>
);