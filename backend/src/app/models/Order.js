import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
        user_id: { type: Sequelize.UUID, allowNull: false },
        user_name: { type: Sequelize.STRING, allowNull: false },
        products: { type: Sequelize.JSONB, allowNull: false },
        status: { type: Sequelize.STRING, allowNull: false, defaultValue: "Pedido realizado" },
      },
      { sequelize, tableName: "orders" }
    );
    return this;
  }
}

export default Order;
