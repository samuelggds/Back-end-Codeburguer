// Carregada a partir de backend/.env pelo comando de desenvolvimento ou pelo ambiente da hospedagem.
const secret = process.env.JWT_SECRET?.trim();
if (!secret || secret === 'SUBSTITUA_POR_UMA_CHAVE_ALEATORIA_FORTE') {
  throw new Error('JWT_SECRET nao configurado. Na pasta backend, execute npm run setup:env e inicie com npm run dev.');
}

export default {
  secret,
  expiresIn: '1d',
};
