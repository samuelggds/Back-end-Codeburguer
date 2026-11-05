// Defina JWT_SECRET no ambiente. Nunca versionar uma chave de assinatura real.
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado. Configure a variável antes de iniciar a API.");
}

export default {
  secret: process.env.JWT_SECRET,
  expiresIn: "1d",
};
