# ChromaDB Runner Docker Project

Este projeto configura um contêiner Docker que automaticamente puxa e executa o ChromaDB na porta 8000 e abre o navegador para acessar a documentação disponível em `http://localhost:8000/docs`.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados no seu sistema:

- [Docker](https://www.docker.com/get-started) (necessário para construir e rodar o contêiner)
- Um ambiente gráfico que suporte o comando `xdg-open` (normalmente disponível em distribuições Linux com interface gráfica)

## Instruções para Construir e Executar

1. Clone este repositório ou baixe os arquivos para o seu diretório local.

2. Navegue até o diretório onde o `Dockerfile` e o `start.sh` estão localizados.

3. Construa a imagem Docker:

    ```bash
    docker build -t chromadb-runner .
    ```

4. Execute a imagem Docker criada:

    ```bash
    docker run chromadb-runner
    ```

5. O contêiner irá iniciar o ChromaDB na porta 8000 e, após alguns segundos, abrirá automaticamente seu navegador na URL `http://localhost:8000/docs`.

## Estrutura do Projeto

- **Dockerfile**: Define a imagem Docker, instala as dependências necessárias, puxa a imagem do ChromaDB e configura o script de inicialização.
- **start.sh**: Script de inicialização que executa o ChromaDB em segundo plano, espera que o serviço esteja disponível e abre o navegador na URL correta.

## Banco de Dados de Receitas

O projeto inclui um banco de dados vetorial utilizando ChromaDB para armazenar receitas culinárias. Este banco permite adicionar, visualizar, atualizar e deletar receitas. As receitas são armazenadas com metadados que podem incluir informações como nome, ingredientes, tipo de dieta, etc.

### Esquema da Receita

Cada receita no banco de dados segue o seguinte esquema:

- **id**: Um identificador único para cada receita.
- **metadatas**: Dados adicionais que descrevem a receita, como nome, tipo de refeição, lista de ingredientes, entre outros.

### Rotas da API

A API permite interagir com o banco de dados de receitas através das seguintes rotas:

- **`POST /add`**: Adiciona uma nova receita ao banco de dados.
  - **Request Body**: JSON contendo os metadados da receita e o id único.

- **`GET /`**: Retorna todas as receitas armazenadas no banco de dados.
  - **Response**: Lista de receitas com seus respectivos ids e metadados.

- **`PUT /update/:id`**: Atualiza uma receita específica no banco de dados.
  - **URL Parameters**: `id` - O identificador da receita a ser atualizada.
  - **Request Body**: JSON contendo os novos metadados para a receita.

- **`DELETE /delete/:id`**: Deleta uma receita específica do banco de dados.
  - **URL Parameters**: `id` - O identificador da receita a ser deletada.

### Exemplo de Uso

- **Adicionar uma Receita:**

  ```bash
  curl -X POST http://localhost:8000/add \
  -H "Content-Type: application/json" \
  -d '{
    "id": "12345",
    "metadatas": {
      "name": "Bolo de Chocolate",
      "ingredients": ["Farinha", "Ovos", "Chocolate"],
      "diet": "Vegetariana"
    }
  }'
  ```bash

 **Adicionar uma Receita:**

 curl http://localhost:8000/

 **Atualizar uma Receita::**

 curl -X PUT http://localhost:8000/update/12345 \
-H "Content-Type: application/json" \
-d '{
  "metadatas": {
    "name": "Bolo de Chocolate Amargo",
    "ingredients": ["Farinha", "Ovos", "Chocolate Amargo"],
    "diet": "Vegetariana"
  }
}'

 **Deletar uma Receita::**

 curl -X DELETE http://localhost:8000/delete/12345
