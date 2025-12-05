const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // experience_years: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },


    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "doctors",
    timestamps: false,
  }
);

module.exports = { Doctor };
