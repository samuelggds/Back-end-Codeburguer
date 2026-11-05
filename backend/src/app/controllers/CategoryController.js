import * as Yup from "yup";
import Category from "../models/Category";
import User from "../models/User";

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json({ message: "Não é Admin" });
    }

    const { name } = request.body;

    const { filename: path } = request.file;

    const catogoryExists = await Category.findOne({
      where: { name },
    });

    if (catogoryExists) {
      return response.json({ error: "Categoria já existente" });
    }

    const { id } = await Category.create({
      name,
      path,
    });

    return response.status(201).json({ id, name });
  }

  async index(request, response) {
    const category = await Category.findAll();

    return response.json(category);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json({ message: "Não é Admin" });
    }

    const { name } = request.body;

    const { id } = request.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return response.status(401).json({ message: "ID incorreto" });
    }

    let path;
    if (request.file) {
      path = request.file.filename;
    }

    await Category.update(
      {
        name,
        path,
      },
      { where: { id } }
    );

    return response.status(200).json({ name, path });
  }
}

export default new CategoryController();
