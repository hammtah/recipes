import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import './details.css'; // We'll define the styles in this file

async function getDetails(id) {
  return fetch(`http://${window.location.hostname}:3001/recipes/${id}`)
    .then((res) => res.json())
    .catch((error) => error);
}

async function deleteRecipe(id) {
  return fetch(`http://${window.location.hostname}:3001/recipes/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .catch((error) => error);
}

function Details() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getDetails(id).then((data) => {
      setDetails(data);
    });
  }, [id]);

  if (!details) {
    return (
      <div className="centered">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="details-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/recipes" className="back-link">← Back to Recipes</Link>
      {/* <Link to="/recipes" className="back-link">delete this item</Link> */}
      {/* delete this recipe button */}
      <button
        className="delete-button"
        onClick={() => {
          deleteRecipe(id).then(() => {
            window.location.href = '/recipes';
          });}}
      >
        Delete Recipe
      </button>
      
        


      <div className="details-content">
        <img src={details.imageUrl} alt={details.title} className="recipe-image" />

        <div className="recipe-info">
          <h2 className="recipe-title">{details.title}</h2>
          <p className="recipe-description">{details.description}</p>

          <h3>🧂 Ingredients</h3>
          <ul className="ingredients-list">
            {details.ingredients?.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>

          <h3>👨‍🍳 Instructions</h3>
          <p className="recipe-instructions">{details.instructions}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default Details;
