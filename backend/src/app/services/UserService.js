import { v4 } from "uuid";
import UserRepository from "../repositories/UserRepository";

class UserService {
  async register({ name, email, password }) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      const error = new Error("usuário já existe");
      error.status = 400;
      throw error;
    }

    // Nunca permita que a requisição pública escolha o perfil de administrador.
    const user = await UserRepository.create({
      id: v4(),
      name,
      email,
      password,
      admin: false,
    });

    return { id: user.id, name: user.name, email: user.email, admin: user.admin };
  }
}

export default new UserService();
