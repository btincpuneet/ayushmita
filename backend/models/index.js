const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js");

// Create Sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port || 3306,
    logging: false, // Disable SQL logs (optional)
  }
);

// Define the User model
const User = sequelize.define(
  "User",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },

    // Virtual field
    location: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.city}, ${this.state}`;
      },
      set() {
        throw new Error(
          "Location cannot be set manually. It is computed from city and state."
        );
      },
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

// Sync on start (safe mode)
sequelize
  .sync({ alter: false }) // prevent table structure from auto-changing
  .then(() => console.log("User model synced"))
  .catch((err) => console.error("Sync error:", err));

module.exports = { sequelize, User };
