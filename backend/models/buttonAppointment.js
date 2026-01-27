const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const ButtonAppointment = sequelize.define(
  "ButtonAppointment",
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
    linkUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "link_url",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "button_appointments",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { ButtonAppointment };
