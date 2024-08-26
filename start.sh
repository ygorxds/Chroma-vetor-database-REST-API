#!/bin/sh

# Inicie o ChromaDB
docker run -d -p 8000:8000 chromadb/chroma

# Aguarde alguns segundos para garantir que o serviço esteja disponível
sleep 5

# Abra o navegador na URL desejada
xdg-open http://localhost:8000/docs

# Mantenha o container rodando
tail -f /dev/null
