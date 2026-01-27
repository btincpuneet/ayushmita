const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const HeroBanner = sequelize.define(
  "HeroBanner",
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

    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    button_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    button_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
    },

    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: "hero_banners",
  }
);

module.exports = { HeroBanner };
