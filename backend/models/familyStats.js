const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const FamilyStats = sequelize.define(
  "FamilyStats",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Our Families",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    count: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    icon: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    url: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "family_stats",
    timestamps: true,
    indexes: [
      { fields: ["isActive"] },
      { fields: ["order"] },
    ],
  }
);

module.exports = { FamilyStats };
