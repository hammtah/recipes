import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
import Recipe from "./Recipe";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import AddRecipeModal from "./AddRecipeModal"; // Import the modal component
import "./AddRecipeModal.css"; // Import the modal CSS
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Renamed state variable
  const [fetchError, setFetchError] = useState(null); // State for fetch errors

  // Wrap the fetch logic in useCallback to avoid recreating it on every render
  const fetchRecipes = useCallback(async () => {
    setFetchError(null); // Clear previous errors
    try {
      const response = await fetch(`http://localhost:3001/recipes`); // Assuming this is your GET endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setFetchError("Failed to load recipes. Please try again later.");
      setRecipes([]); // Clear recipes on error
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    fetchRecipes(); // Fetch recipes on initial mount
  }, [fetchRecipes]); // Depend on fetchRecipes

  const RecipesContainer = styled.div`
    padding: 2em;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 1000px;
  `;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header">
        <h1>Recipes</h1>
        {/* Add onClick handler to the button */}
        <button onClick={() => setIsModalOpen(true)}>Add a Recipe ➕</button>
      </div>

      {fetchError && (
        <p style={{ color: "red", textAlign: "center" }}>{fetchError}</p>
      )}

      <RecipesContainer>
        {recipes.length > 0
          ? recipes.map((recipe) => (
              <NavLink to={`/recipes/${recipe.id}`} key={recipe.id}>
                <Recipe
                  title={recipe.title}
                  description={recipe.description}
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                  imageUrl={recipe.imageUrl}
                />
              </NavLink>
            ))
          : !fetchError && (
              <p>No recipes found.</p>
            ) // Show message if no recipes and no error
        }
      </RecipesContainer>

      {/* Render the modal outside the container */}
      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRecipeAdded={fetchRecipes} // Pass the fetch function to refresh list
      />
    </motion.div>
  );
}

export default Home;
