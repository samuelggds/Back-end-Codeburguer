import * as Yup from "yup";

import Products from "../models/Products";
import Category from "../models/Category";
import User from "../models/User";

class ProductsController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
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

    const { filename: path } = request.file;

    const { name, price, category_id, offer } = request.body;

    const product = await Products.create({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return response.status(201).json(product);
  }

  async index(request, response) {
    const products = await Products.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    return response.json(products);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
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

    const { id } = request.params;

    const product = await Products.findByPk(id);

    if (!product) {
      return response
        .status(401)
        .json({ message: "o ID deste produto está incorreto" });
    }

    let path;
    if (request.file) {
      path = request.file.filename;
    }

    const { name, price, category_id, offer } = request.body;

    await Products.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      { where: { id } }
    );

    return response.status(200).json();
  }
}

export default new ProductsController();
