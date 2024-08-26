// routes/recipeRoutes.js
const express = require('express');
const { addRecipe, getRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const router = express.Router();

// Rota para adicionar uma nova receita
router.post('/add', addRecipe);

// Rota para obter todas as receitas
router.post('/', getRecipes);

// Rota para atualizar uma receita existente
router.put('/update/:id', updateRecipe);

// Rota para deletar uma receita
router.delete('/delete/:id', deleteRecipe);

module.exports = router;
