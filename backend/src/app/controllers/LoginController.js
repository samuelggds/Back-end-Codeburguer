import * as Yup from "yup";
import LoginService from "../services/LoginService";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

class LoginController {
  async store(request, response) {
    try {
      const credentials = await schema.validate(request.body, { abortEarly: false, stripUnknown: true });
      const result = await LoginService.login(credentials);
      return response.json(result);
    } catch (error) {
      if (error.name === "ValidationError") return response.status(400).json({ error: "Verifique se seus dados estão corretos" });
      if (error.status) return response.status(error.status).json({ error: error.message });
      console.error("Erro ao autenticar usuário", error);
      return response.status(500).json({ error: "Erro interno na autenticação" });
    }
  }
}

export default new LoginController();
