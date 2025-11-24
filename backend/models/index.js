const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically increment the ID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user' // Default role value
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  },
  // Virtual field for 'location'
  location: {
    type: DataTypes.VIRTUAL,
    get() {
      const city = this.getDataValue('city');
      const state = this.getDataValue('state');
      return `${city}, ${state}`;
    },
    set(value) {
      throw new Error('Location cannot be manually set. It is automatically generated from city and state.');
    }
  }
}, {
  // Additional model options
  timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
  underscored: true, // Use snake_case for column names (e.g., call_recording_status)
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err));

module.exports = { sequelize, User };
