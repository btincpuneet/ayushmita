const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Disease = sequelize.define(
  "Disease",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    description_html: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    seo_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    seo_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    seo_keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    canonical_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    tableName: "diseases",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { Disease };
