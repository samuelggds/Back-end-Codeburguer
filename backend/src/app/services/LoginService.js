import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import UserRepository from "../repositories/UserRepository";

class LoginService {
  async login({ email, password }) {
    const user = await UserRepository.findByEmail(email.trim().toLowerCase());
    const valid = user && (await user.checkPassword(password));
    if (!valid) {
      const error = new Error("E-mail ou senha incorretos");
      error.status = 401;
      throw error;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  }
}

export default new LoginService();
