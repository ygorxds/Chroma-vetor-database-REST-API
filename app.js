// app.js
const express = require('express');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Middleware para parsing do JSON
app.use(express.json());

// Rotas
app.use('/api/recipes', recipeRoutes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
