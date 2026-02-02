const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const NewsEvent = sequelize.define(
  "NewsEvent",
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

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // ✅ Image SEO
    image_alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    editor_content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: true,
    },

    canonical_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    tableName: "news_events",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { NewsEvent };
