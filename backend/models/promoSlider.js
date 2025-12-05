const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const PromoSlider = sequelize.define('PromoSlider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: DataTypes.STRING,
  subtitle: DataTypes.STRING,
  description: DataTypes.STRING,
  discount_text: DataTypes.STRING,
  code_text: DataTypes.STRING,

  image_url: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  },

  button_text: {
    type: DataTypes.STRING,
    defaultValue: "GRAB NOW"
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },

}, {
  timestamps: false,
  underscored: true,
  tableName: 'promo_sliders'
});

module.exports = { PromoSlider };
