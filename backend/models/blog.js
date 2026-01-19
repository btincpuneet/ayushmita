const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    disease_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    treatment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    disease_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    treatment_name: {
      type: DataTypes.STRING,
      allowNull: true,
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

    blog_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blog_image_alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    blog_image_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    description_html: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    author_name: {
      type: DataTypes.STRING,
      defaultValue: "Admin",
    },

    author_avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_global: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    status: {
      type: DataTypes.ENUM("draft", "published"),
      defaultValue: "published",
    },

    meta_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    canonical_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    meta_keywords: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    view_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    published_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    tableName: "blogs",
    timestamps: false,
    underscored: true,
  }
);

module.exports = { Blog };
