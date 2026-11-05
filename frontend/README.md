# DevBurger — frontend (DevClub)

Projeto inicial para acompanhar as videoaulas de **DevBurger — Interface**, utilizando a API já existente neste repositório.

## Objetivo

- Reproduzir a stack, o código, as telas e a estrutura ensinados nas videoaulas, para a atividade do certificado.
- Desenvolver o frontend sem alterar funcionalidades ou regras de negócio da API.
- Integrar com o backend `Back-end-Codeburguer` à medida que as aulas avançarem.

## Estado atual

**Bootstrap provisório:** React + JavaScript (JSX) + Vite. O layout do curso **ainda não foi reproduzido** e **nenhuma integração real foi implementada**. Bibliotecas, versões e organização poderão ser ajustadas para corresponder exatamente à aula, após acesso ao código/material de referência. Não confundir este scaffold com a entrega final do certificado.

## Rodar localmente

Use um terminal aberto na pasta `frontend`:

```bash
npm install
npm run dev
```

Abra a URL impressa pelo Vite (normalmente `http://localhost:5173`).

Para gerar o build:

```bash
npm run build
```

## API existente

A API está na raiz do repositório, escutando na porta `3001`, conforme `src/server.js`.

Rotas identificadas em `src/routes.js`:

- `POST /users` — cadastro;
- `POST /login` — autenticação;
- `GET /products` — produtos;
- `GET /categories` — categorias;
- `GET /orders` — pedidos.

**Atenção:** as rotas de produtos, categorias e pedidos estão após o middleware de autenticação; exigem token válido. O frontend não deve tentar acessar essas rotas anonimamente. As configurações de CORS e a integração serão revistas quando chegarmos a essa etapa do curso.

Para configurar uma URL local, copie `.env.example` para `.env`. Nunca faça commit de segredos. Variáveis `VITE_*` são públicas no navegador.

## Próxima etapa

Conferir a aula **Iniciando Projeto** e reproduzir as dependências, comandos e arquivos mostrados pelo professor antes de começar a tela de cadastro/login.
