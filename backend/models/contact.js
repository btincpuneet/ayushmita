const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const ContactUs = sequelize.define(
  "ContactUs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content_html: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "contact_us_sections",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["status"] },
      { fields: ["deleted_at"] },
    ],
  }
);

module.exports = { ContactUs };
