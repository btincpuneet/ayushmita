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

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    speciality_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },


    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    description_html: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    faq_html: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },


    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    seo_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    seo_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    seo_keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    canonical_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    tableName: "doctors",
    timestamps: false,
  }
);

module.exports = { Doctor };
