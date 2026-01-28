const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const FAQ = sequelize.define(
  "FAQ",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1, 
    },
     faq_type: {
      type: DataTypes.ENUM("home", "hospital", "doctor"),
      allowNull: false,
      defaultValue: "home",
    },

    hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,       
    underscored: true,     
    tableName: "faqs",
  }
);

module.exports = { FAQ };
