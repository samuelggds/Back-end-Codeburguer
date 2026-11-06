# Frontend — Projeto Codeburguer (DevClub)

Frontend desenvolvido para acompanhar as aulas da formação DevBurger/Codeburguer e integrar com a API existente.

## Stack provisória

- React + JavaScript (JSX)
- Vite

**Importante para o certificado:** dependências, organização e telas ainda devem ser conferidas com o código usado pelo professor. Login e cadastro utilizam a API existente; a home foi implementada a partir da referência visual fornecida. O catálogo e a cesta da home funcionam localmente e ainda não enviam pedidos à API.

## Como executar

A partir da pasta `frontend`:

```bash
npm ci
npm run dev
```

Para gerar um build:

```bash
npm run build
```

## Home e testes

A [documentação da home](docs/HOME.md) descreve os componentes React, CSS, imagens originais, logotipo, fontes e pontos de integração.

```bash
npm test
npx playwright install chromium
npm run test:e2e
```

## API

O backend está separado em `../backend` e, conforme `backend/src/server.js`, inicia na porta **3001**.

Rotas identificadas em `backend/src/routes.js`:
- `POST /users` — cadastro
- `POST /login` — login
- `GET /products` — produtos (autenticado)
- `GET /categories` — categorias (autenticado)
- `GET /orders` — pedidos (autenticado)

As rotas de produtos, categorias e pedidos requerem token válido conforme o middleware existente. A integração dessas rotas com o catálogo e a cesta permanece pendente.

Se precisar configurar a URL da API, copie `.env.example` para `.env`. Variáveis `VITE_*` são expostas ao navegador; nunca coloque segredos nelas.
