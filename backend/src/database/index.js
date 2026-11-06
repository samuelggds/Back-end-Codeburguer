import Sequelize from "sequelize";
import dataConfig from "../config/database";

import User from "../app/models/User";
import Products from "../app/models/Products";
import Category from "../app/models/Category";

const models = [User, Products, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataConfig);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
