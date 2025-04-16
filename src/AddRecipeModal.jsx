import React, { useState } from 'react';
import './AddRecipeModal.css'; // We'll create this next

function AddRecipeModal({ isOpen, onClose, onRecipeAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(''); // Input as string, split later
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    setIsLoading(true);

    // Basic validation (can be expanded)
    if (!title || !ingredients || !instructions) {
        setError('Title, Ingredients, and Instructions are required.');
        setIsLoading(false);
        return;
    }

    const ingredientsArray = ingredients.split('\n').filter(ing => ing.trim() !== ''); // Split by newline and remove empty lines

    const newRecipe = {
      title,
      description,
      ingredients: ingredientsArray,
      instructions,
      imageUrl,
    };

    try {
      const response = await fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        // Try to get error message from backend if available
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
            // Ignore if response is not JSON
        }
        throw new Error(errorMessage);
      }

      // Clear form and close modal on success
      setTitle('');
      setDescription('');
      setIngredients('');
      setInstructions('');
      setImageUrl('');
      if (onRecipeAdded) {
        onRecipeAdded(); // Notify parent component
      }
      onClose(); // Close the modal

    } catch (err) {
      console.error('Failed to add recipe:', err);
      setError(err.message || 'Failed to add recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null; // Don't render anything if the modal is closed
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients * (one per line)</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              rows="5"
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructions">Instructions *</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              rows="5"
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
            //   type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="modal-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Recipe'}
            </button>
            <button type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeModal;
