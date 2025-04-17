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
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [filters, setFilters] = useState([]);
  console.log(filters.length);
  filters.forEach((element) => {
    console.log(element);
  });

  const handle_filters = (filter) => {
    return (e) => {
      if (e.target.checked) {
        setFilters((prev) => [...prev, filter]);
      } else {
        setFilters((prev) => prev.filter((f) => f !== filter));
      }
    };
  };

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

  // Filter recipes based on the search term
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.length === 0 ||
        filters.some(
          (filter) =>
            recipe.title.toLowerCase().includes(filter.toLowerCase()) ||
            recipe.description.toLowerCase().includes(filter.toLowerCase())
        ))
  );

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

      {/* Add the search input field */}
      <div style={{ padding: "0 2em", margin: "1em auto", maxWidth: "1000px" }}>
        <input
          type="text"
          placeholder="Search recipes by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
        <div>
          filters:
          <div style={{ display: "flex", gap: "40px" }}>
            <label className={filters.includes("tacos") ? "check-on" : "check"}>
              Tacos{" "}
              <input
                onChange={handle_filters("tacos")}
                type="checkbox"
                value={"Tacos"}
              />
            </label>
            <label className={filters.includes("tagine") ? "check-on" : "check"}>
              tagine{" "}
              <input
                onChange={handle_filters("tagine")}
                type="checkbox"
                value={"Tagine"}
              />
            </label>
            <label className={filters.includes("Pizza") ? "check-on" : "check"}>
              pizza{" "}
              <input
                onChange={handle_filters("Pizza")}
                type="checkbox"
                value={"Pizza"}
              />
            </label>
            <label className={filters.includes("spaggeti") ? "check-on" : "check"}>
              spaggeti
              <input
                onChange={handle_filters("spaggeti")}
                // onChange={(e) => {console.log(e)}}
                type="checkbox"
                value={"spaggeti"}
              />
            </label>
            
          </div>
          {/* .forEach(element => {} */}
          {/* }); */}
        </div>
      </div>

      {fetchError && (
        <p style={{ color: "red", textAlign: "center" }}>{fetchError}</p>
      )}

      <RecipesContainer>
        {/* Map over filteredRecipes instead of recipes */}
        {filteredRecipes.length > 0
          ? filteredRecipes.map((recipe) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NavLink to={`/recipes/${recipe.id}`} key={recipe.id}>
                  <Recipe
                    title={recipe.title}
                    description={recipe.description}
                    ingredients={recipe.ingredients}
                    instructions={recipe.instructions}
                    imageUrl={recipe.imageUrl}
                  />
                </NavLink>
              </motion.div>
            ))
          : !fetchError && (
              // Update the message for no results/no matching results
              <p>
                {searchTerm
                  ? "No matching recipes found."
                  : "No recipes found."}
              </p>
            )}
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
