const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const TopPartnerHospital = sequelize.define(
  "TopPartnerHospital",
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    founded_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hospital_beds: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    description_html: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
   
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    timestamps: false,
    tableName: "top_partner_hospitals",
    underscored: true,
  }
);

module.exports = { TopPartnerHospital };
