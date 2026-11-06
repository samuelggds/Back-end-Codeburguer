import * as Yup from "yup";
import UserService from "../services/UserService";

const schema = Yup.object().shape({
  name: Yup.string().trim().min(2).required(),
  email: Yup.string().trim().lowercase().email().required(),
  password: Yup.string().required().min(6).max(15),
});

class UserController {
  async store(request, response) {
    try {
      const data = await schema.validate(request.body, { abortEarly: false, stripUnknown: true });
      const user = await UserService.register(data);
      return response.status(201).json(user);
    } catch (error) {
      if (error.name === "ValidationError") return response.status(400).json({ error: error.errors });
      if (error.status) return response.status(error.status).json({ message: error.message });
      console.error("Erro ao cadastrar usuário", error);
      return response.status(500).json({ error: "Erro interno ao cadastrar usuário" });
    }
  }
}

export default new UserController();
