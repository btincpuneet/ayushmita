const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const TopPartnerHospitalSpecialities = sequelize.define(
  "TopPartnerHospitalSpecialities",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    top_partner_hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "top_partner_hospitals",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    disease_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "diseases",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "top_partner_hospital_diseases",
    timestamps: false,
    underscored: true,
  }
);

module.exports = { TopPartnerHospitalSpecialities };
