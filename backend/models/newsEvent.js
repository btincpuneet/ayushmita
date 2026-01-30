const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const NewsEvent = sequelize.define(
  "NewsEvent",
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

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true, 
    },

    editor_content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    tableName: "news_events",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { NewsEvent };
