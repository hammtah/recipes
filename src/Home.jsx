import React from 'react'
import { useState, useEffect } from 'react';
import Recipe from './Recipe';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import { motion } from 'framer-motion';
async function getRecipes(){
    return fetch(`http://localhost:3001/recipes`)
            .then((res)=>res.json())
            .catch((error)=> error);
}

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    
    useEffect(()=>{
        getRecipes().then((res)=>{
            setRecipes(res);
        })
    }, [])

    const RecipesContainer = styled.div`
        padding: 2em;
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
        margin: 0 auto;
        max-width:1000px; 
    `;
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >
        <div className='header'>
        <h1 >Recipes</h1>
        <button>Add a Recipe ➕</button>

        </div>
        {/* <h1 style={{textAlign: 'center'}}>Recipes</h1> */}
        
        <RecipesContainer>
            {recipes.map( recipe =>
                <NavLink to={`/recipes/${recipe.id}`}  key={recipe.id}>
                    <Recipe key={recipe.id} title={recipe.title} description={recipe.description} ingredients={recipe.ingredients} instructions={recipe.instructions} imageUrl={recipe.imageUrl}/>
                </NavLink>
            )}
        </RecipesContainer>
    </ motion.div>
  )
}


export default Home