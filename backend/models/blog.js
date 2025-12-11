const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,     // NULL allowed for global blogs
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

  short_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  description_html: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },

  is_global: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

}, {
  timestamps: false,       // You use manual timestamps
  underscored: true,       // category_id, short_description etc.
});

module.exports = { Blog };
