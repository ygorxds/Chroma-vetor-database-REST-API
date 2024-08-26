// controllers/recipeController.js
const axios = require('axios');
const Recipe = require('../models/recipeModel');

const CHROMA_URL = 'http://localhost:8000/api/v1/collections';
const COLLECTION_ID = 'bd86a24f-3fde-49c5-82f4-1ed5d6d6b22a';

const addRecipe = async (req, res) => {
  const { tipo, receita, ingredientes, quantidadePessoas, quantidadeIngredientes } = req.body;
  const newRecipe = new Recipe(tipo, receita, ingredientes, quantidadePessoas, quantidadeIngredientes);

  try {
    const response = await axios.post(`${CHROMA_URL}/${COLLECTION_ID}/add`, {
      metadatas: [newRecipe],
      ids: [`recipe-${Date.now()}`]  // Utilizando o timestamp como ID único
    });
    res.status(201).json({ message: 'Receita adicionada com sucesso', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar a receita', error: error.message });
  }
};

const getRecipes = async (req, res) => {
    try {
      const response = await axios.post(`${CHROMA_URL}/${COLLECTION_ID}/get`, {
        include: ["metadatas", "documents"]
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar as receitas', error: error.message });
    }
  };

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { tipo, receita, ingredientes, quantidadePessoas, quantidadeIngredientes } = req.body;
  const updatedRecipe = new Recipe(tipo, receita, ingredientes, quantidadePessoas, quantidadeIngredientes);

  try {
    const response = await axios.post(`${CHROMA_URL}/${COLLECTION_ID}/update`, {
      ids: [id],
      metadatas: [updatedRecipe]
    });
    res.status(200).json({ message: 'Receita atualizada com sucesso', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a receita', error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.post(`${CHROMA_URL}/${COLLECTION_ID}/delete`, {
      ids: [id]
    });
    res.status(200).json({ message: 'Receita deletada com sucesso', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a receita', error: error.message });
  }
};

module.exports = {
  addRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe
};
