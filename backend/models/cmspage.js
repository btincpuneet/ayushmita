const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const CmsSection = sequelize.define(
  "CmsSection",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content_html: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    content_json: {
      type: DataTypes.JSON,
      allowNull: true, 
    },

    status: {
      type: DataTypes.ENUM("inactive", "active"),
      defaultValue: "active",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "cms_sections",
    timestamps: false,
    underscored: true,
  }
);

module.exports = { CmsSection };
