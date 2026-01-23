const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Speciality = sequelize.define(
  "Speciality",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1, 
    },
  },
  {
    tableName: "specialities",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { Speciality };
