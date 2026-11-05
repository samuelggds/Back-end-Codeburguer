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

1. `cd backend && npm install`; configure PostgreSQL e MongoDB conforme a configuração existente.
2. Configure a variável de ambiente `JWT_SECRET` usando uma chave aleatória forte. O backend não carrega automaticamente arquivos .env; use o ambiente do terminal ou configure o carregamento.
3. Execute as migrations existentes e `npm run dev` no backend (porta 3001).
4. `cd frontend && npm install && npm run dev` em outro terminal.
5. Use /register e /login. O Vite encaminha /api para http://localhost:3001.

O armazenamento do JWT em sessionStorage é para a etapa didática; produção requer revisão de XSS, política de sessão e autenticação.

O design se inspira nas capturas do Figma; ainda é preciso incorporar os SVGs e fontes originais para reproduzir os detalhes com fidelidade.
