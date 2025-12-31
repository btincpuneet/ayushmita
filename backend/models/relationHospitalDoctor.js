const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const RelationHospitalDoctor = sequelize.define(
  "RelationHospitalDoctor",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    hospital_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    doctor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      comment: "1 = Active, 0 = Inactive",
    },
  },
  {
    tableName: "relation_hospital_doctor",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { RelationHospitalDoctor };
