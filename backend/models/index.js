const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js");

// Create Sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host || "127.0.0.1",
    dialect: config.dialect || "mysql",
    port: config.port || 3306,
    logging: false,
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
    location: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.city}, ${this.state}`;
      },
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

// ✅ Proper DB connection & sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ alter: false });
    console.log("✅ User model synced");
  } catch (err) {
    console.error("❌ Database error:", err);
  }
})();

module.exports = { sequelize, User };
