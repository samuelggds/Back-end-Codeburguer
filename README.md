# Projeto Codeburguer

Frontend React + JavaScript + Vite e backend Node.js + Express + Sequelize.

## Autenticação
- Cadastro: `POST /users`.
- Login: `POST /login`, devolve JWT ao confirmar as credenciais.
- Validação frontend: React Hook Form e Zod.
- Backend organizado em Routes → Controllers → Services → Repositories → Models.
- Por segurança, o cadastro público cria apenas usuários comuns.
- Rotas existentes de produtos, categorias e pedidos seguem protegidas por JWT.

## Execução local

1. Use Node.js 20.6+; execute `cd backend && npm install`; configure PostgreSQL e MongoDB conforme a configuração existente.
2. `npm run dev` cria automaticamente `backend/.env` com uma chave `JWT_SECRET` aleatória forte (se necessário) e carrega o arquivo com a opção nativa `--env-file` do Node.js. O `.env` fica fora do Git.
3. Execute as migrations existentes e `npm run dev` no backend (porta 3001).
4. `cd frontend && npm install && npm run dev` em outro terminal.
5. Use /register e /login. O Vite encaminha /api para http://localhost:3001.

O armazenamento do JWT em sessionStorage é para a etapa didática; produção requer revisão de XSS, política de sessão e autenticação.

O design se inspira nas capturas do Figma; ainda é preciso incorporar os SVGs e fontes originais para reproduzir os detalhes com fidelidade.
