const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Footer = sequelize.define(
  "Footer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_html: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    seo_title: DataTypes.STRING,
    seo_description: DataTypes.TEXT,
    seo_keywords: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "footer_sections",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["status"] },
      { fields: ["deleted_at"] },
    ],
  }
);

module.exports = { Footer };
