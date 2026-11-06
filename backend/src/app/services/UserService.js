import { v4 } from "uuid";
import UserRepository from "../repositories/UserRepository";

class UserService {
  async register({ name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await UserRepository.findByEmail(normalizedEmail);
    if (existing) {
      const error = new Error("Este e-mail já está cadastrado");
      error.status = 409;
      throw error;
    }

    try {
      // Cadastro publico nunca pode selecionar o papel de administrador.
      const user = await UserRepository.create({
        id: v4(),
        name: name.trim(),
        email: normalizedEmail,
        password,
        admin: false,
      });

      return { id: user.id, name: user.name, email: user.email, admin: user.admin };
    } catch (error) {
      // Duas requisicoes simultaneas nao podem criar o mesmo e-mail.
      if (error.name === "SequelizeUniqueConstraintError") {
        const conflict = new Error("Este e-mail já está cadastrado");
        conflict.status = 409;
        throw conflict;
      }
      throw error;
    }
  }
}

export default new UserService();
