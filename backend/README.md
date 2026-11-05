# Backend - Projeto Codeburguer

API Node.js + Express + Sequelize.

## Iniciar localmente

Na pasta `backend`, com Node.js 20.6+ (recomendado Node 22 ou 24):

```bash
npm install
npm run dev
```

O `npm run dev` executa automaticamente `npm run setup:env`. Na primeira execucao, isso cria `backend/.env` com uma **chave JWT aleatoria forte** e o Nodemon carrega o arquivo via `node --env-file=.env`. Se o arquivo ja existir, a chave e as demais configuracoes sao preservadas.

**Nao envie o .env para o GitHub**. Ele esta incluido no `.gitignore`. Nunca copie o valor de exemplo `SUBSTITUA_POR_UMA_CHAVE_ALEATORIA_FORTE` como segredo real.

Para gerar ou verificar o arquivo manualmente:

```bash
npm run setup:env
npm run test:env
```

Para implantacao em producao, defina `JWT_SECRET` na configuracao segura do provedor (a chave nao deve ser commitada). O Node mantem a variavel de ambiente existente quando presente.

A API usa a porta **3001**. PostgreSQL e MongoDB ainda precisam estar disponiveis conforme as configuracoes atuais; a chave JWT so resolve o problema de inicializacao da autenticacao.

## Sequelize

A configuracao `.sequelizerc` preserva os caminhos relativos para modelos e migrations. Execute os comandos a partir de `backend`.

## Frontend

A interface React + Vite esta em `../frontend`; usa proxy para a API na porta 3001.
