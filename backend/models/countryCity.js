const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const CountryCity = sequelize.define(
  "CountryCity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    country_code: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "country_cities",
    timestamps: false,
  }
);

module.exports = { CountryCity };
