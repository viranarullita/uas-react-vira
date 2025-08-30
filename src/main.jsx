import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Pages
import Home from "./pages/Home.jsx";
import AllRecipes from "./pages/AllRecipes.jsx";  
import About from "./pages/About.jsx";
import Favorites from "./pages/Favorites.jsx";
import MyRecipes from "./pages/MyRecipes.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import Login from "./pages/Login.jsx";
import Registrasi from "./pages/Registrasi.jsx";

// ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registrasi />,
  },
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
