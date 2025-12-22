const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const FAQ = sequelize.define(
  "FAQ",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1, // 1 = active, 0 = inactive
    },
  },
  {
    timestamps: true,       // created_at + updated_at
    underscored: true,      // snake_case columns
    tableName: "faqs",
  }
);

module.exports = { FAQ };
