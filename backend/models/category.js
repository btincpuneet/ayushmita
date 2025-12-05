const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_include_top_nav: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: false,
  underscored: true,
});

module.exports = { Category };
