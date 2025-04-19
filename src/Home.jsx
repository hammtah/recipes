import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import AddRecipeModal from "./AddRecipeModal";
import "./AddRecipeModal.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);

  const filterOptions = ["tacos", "tagine", "Pizza", "spaggeti","beef","chicken"];

  const handle_filters = (filter) => (e) => {
    if (e.target.checked) {
      setFilters((prev) => [...prev, filter]);
    } else {
      setFilters((prev) => prev.filter((f) => f !== filter));
    }
  };

  const fetchRecipes = async () => {
    setFetchError(null);
    try {
      const API_PORT = 3001;
      const response = await fetch(
        `http://${window.location.hostname}:${API_PORT}/recipes`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setFetchError("Failed to load recipes. Please try again later.");
      setRecipes([]);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const RecipesContainer = styled.div`
    padding: 2em;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 1000px;
  `;

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
        <button onClick={() => setIsModalOpen(true)}>Add a Recipe ➕</button>
      </div>

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
        <div style={{ display: "flex", gap: "10px", paddingTop: "10px" }}>
          filters:
          {filterOptions.map((filter) => (
            <label
              key={filter}
              className={filters.includes(filter) ? "check-on" : "check"}
            >
              {filter}{" "}
              <input
                type="checkbox"
                onChange={handle_filters(filter)}
                checked={filters.includes(filter)}
              />
            </label>
          ))}
        </div>
      </div>

      {fetchError && (
        <p style={{ color: "red", textAlign: "center" }}>{fetchError}</p>
      )}

      <RecipesContainer>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NavLink to={`/recipes/${recipe.id}`}>
                <Recipe
                  title={recipe.title}
                  description={recipe.description}
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                  imageUrl={recipe.imageUrl}
                  num={recipe.num}
                  time={recipe.time}
                />
              </NavLink>
            </motion.div>
          ))
        ) : !fetchError ? (
          <p>{searchTerm ? "No matching recipes found." : "No recipes found."}</p>
        ) : null}
      </RecipesContainer>

      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRecipeAdded={fetchRecipes}
      />
    </motion.div>
  );
}

export default Home;
