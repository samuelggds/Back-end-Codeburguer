# Backend — CodeBurguer

API Node.js + Express + Sequelize, usando **somente PostgreSQL** para usuarios, produtos, categorias e pedidos.

## Configuracao local

Requisitos: Node.js 20.6+ (recomendado Node 22), PostgreSQL iniciado e um banco chamado `codeburguer`.

1. Entre na pasta `backend` e execute `npm install`.
2. Execute `npm run setup:env`, que gera `backend/.env` com segredo JWT aleatorio se ainda nao existir.
3. Edite `backend/.env` para adicionar, conforme sua instalacao:
   - `DB_HOST=127.0.0.1`
   - `DB_PORT=5432`
   - `DB_USER=postgres`
   - `DB_PASSWORD=<sua senha local>`
   - `DB_NAME=codeburguer`
4. Execute `npx sequelize-cli db:migrate` para criar as tabelas.
5. Execute `npm run dev` (API na porta 3001).
6. Em outro terminal, na pasta `frontend`, execute `npm install` e `npm run dev`.

O Vite encaminha chamadas `/api` ao backend na porta 3001.

## Autenticacao

- `POST /users` — nome, e-mail e senha; cria usuario comum e retorna ID/nome/e-mail, sem senha.
- `POST /login` — e-mail e senha; devolve os dados publicos do usuario e JWT.
- O e-mail e normalizado em minusculas, a senha e guardada como hash bcrypt, e e-mails repetidos retornam HTTP 409.
- Rotas de produtos, categorias e pedidos exigem JWT.
- A persistencia de pedidos agora usa a tabela PostgreSQL `orders`, com produtos gravados em JSONB.

**Seguranca:** mantenha `.env` fora do repositorio. O segredo JWT e a senha do banco nao devem ser colocados no codigo. Troque credenciais antigas se estiverem expostas.

## Verificacoes

```bash
npm run test:env
npx sequelize-cli db:migrate:status
```

Teste manualmente cadastro, login com senha correta e incorreta, cadastro duplicado e requisicoes protegidas com e sem token. Os testes de integracao com PostgreSQL e navegador ainda nao foram executados neste PR.
