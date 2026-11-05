# Projeto Codeburguer

Projeto do curso DevClub com **frontend e backend organizados separadamente** no mesmo repositório.

## Estrutura

```text
.
├── frontend/    # React + JavaScript + Vite
├── backend/     # API Node.js + Express + Sequelize
└── README.md
```

## Iniciar o frontend

```bash
cd frontend
npm install
npm run dev
```

## Iniciar o backend

Em outro terminal, a partir da raiz do repositório:

```bash
cd backend
npm install
npm run dev
```

A API utiliza a porta **3001**. É necessário configurar as dependências externas de banco de dados já usadas pelo backend.

## Observações

- A mudança de estrutura preservou os arquivos e regras de negócio originais da API; o arquivo `.sequelizerc` permanece junto dela.
- O frontend é uma base inicial e será adaptado para reproduzir o código e a stack da videoaula, conforme o material do DevClub.
- Não há integração real implementada entre as partes ainda.
- Os comandos de cada projeto devem ser executados dentro da respectiva pasta.
