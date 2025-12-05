const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const TopPartnerHospital = sequelize.define(
  "TopPartnerHospital",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },

    image_url: {
      type: DataTypes.BLOB("long"), // Store only 1 image
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    }
  },
  {
    timestamps: false,
    tableName: "top_partner_hospitals",
    underscored: true,
  }
);

module.exports = { TopPartnerHospital };
