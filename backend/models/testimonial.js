// models/testimonial.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Testimonial = sequelize.define("Testimonial", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING },
  rating: { type: DataTypes.INTEGER, defaultValue: 5 },
  message: { type: DataTypes.TEXT, allowNull: false },
  image_url: { type: DataTypes.BLOB("long"), allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: "active" },
}, {
  tableName: "testimonials",
  timestamps: true,
  underscored: true,
});

module.exports = { Testimonial };
