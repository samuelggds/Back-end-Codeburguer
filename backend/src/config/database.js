const required = (key) => {
  const value = process.env[key]?.trim();
  if (!value) throw new Error(`Configure ${key} no backend/.env antes de iniciar a API.`);
  return value;
};

module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || "postgres",
  password: required("DB_PASSWORD"),
  database: process.env.DB_NAME || "codeburguer",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
