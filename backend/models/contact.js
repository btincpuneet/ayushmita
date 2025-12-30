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


    seo_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    seo_description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    seo_keywords: {
      type: DataTypes.TEXT, 
      allowNull: true,
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
     
      { fields: ["deleted_at"] },
      { fields: ["seo_title"] },
    ],
  }
);

module.exports = { ContactUs };
