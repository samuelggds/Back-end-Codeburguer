# Frontend — Projeto Codeburguer (DevClub)

Frontend desenvolvido para acompanhar as aulas da formação DevBurger/Codeburguer e integrar com a API existente.

## Stack provisória

- React + JavaScript (JSX)
- Vite

**Importante para o certificado:** o projeto inicial é apenas uma base. Dependências, versões, organização e telas ainda devem ser conferidas com o código usado pelo professor. Não há integração funcional nem reprodução final das videoaulas nesta etapa.

## Como executar

A partir da pasta `frontend`:

```bash
npm install
npm run dev
```

Para gerar um build:

```bash
npm run build
```

## API

O backend está separado em `../backend` e, conforme `backend/src/server.js`, inicia na porta **3001**.

Rotas identificadas em `backend/src/routes.js`:
- `POST /users` — cadastro
- `POST /login` — login
- `GET /products` — produtos (autenticado)
- `GET /categories` — categorias (autenticado)
- `GET /orders` — pedidos (autenticado)

As rotas de produtos, categorias e pedidos requerem token válido conforme o middleware existente. A integração será implementada nas próximas etapas, seguindo as aulas.

Se precisar configurar a URL da API, copie `.env.example` para `.env`. Variáveis `VITE_*` são expostas ao navegador; nunca coloque segredos nelas.
