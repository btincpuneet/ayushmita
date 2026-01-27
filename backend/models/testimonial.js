const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Testimonial = sequelize.define(
  "Testimonial",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 5 },
    image_url: { type: DataTypes.STRING, allowNull: true },  // IMPORTANT
    status: { type: DataTypes.STRING, defaultValue: "active" },
  },
  {
    tableName: "testimonials",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { Testimonial };
