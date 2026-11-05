# Backend — Projeto Codeburguer

API existente em **Node.js + Express + Sequelize**. Os arquivos e as regras de negócio originais foram preservados nesta organização.

## Execução

A partir da pasta `backend`:

```bash
npm install
npm run dev
```

O servidor é iniciado na porta **3001** conforme `src/server.js`, desde que o banco e demais serviços requeridos pelo projeto estejam configurados.

## Sequelize

O arquivo `.sequelizerc` foi movido junto com a API, preservando os caminhos relativos para configurações, modelos e migrations. Execute comandos do Sequelize a partir da pasta `backend`.

## Frontend

A interface React + Vite está em `../frontend`.
