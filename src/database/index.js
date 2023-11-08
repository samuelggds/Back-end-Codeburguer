import Sequelize from "sequelize";
import dataConfig from "../config/database";
import mongoose from "mongoose";

import User from "../app/models/User";
import Products from "../app/models/Products";
import Category from "../app/models/Category";

const models = [User, Products, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(dataConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/codeburguer"
    );
  }
}

export default new Database();
