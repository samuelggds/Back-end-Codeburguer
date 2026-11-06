"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      user_name: { type: Sequelize.STRING, allowNull: false },
      products: { type: Sequelize.JSONB, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: "Pedido realizado" },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex("orders", ["user_id"]);
    await queryInterface.addIndex("orders", ["status"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("orders");
  },
};
