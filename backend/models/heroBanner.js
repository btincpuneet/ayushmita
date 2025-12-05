const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const HeroBanner = sequelize.define('HeroBanner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  button_text: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  button_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
    type: DataTypes.STRING,
    // New uploads are disabled by default; only one banner should be active at a time
    defaultValue: 'inactive',
  },

  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  timestamps: false,
  underscored: true,
});

module.exports = { HeroBanner };
