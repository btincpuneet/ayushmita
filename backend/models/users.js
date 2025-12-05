module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: "user" },
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      status: { type: DataTypes.STRING, defaultValue: "active" },
      location: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.city}, ${this.state}`;
        },
      },
    },
    { tableName: "users", timestamps: false, underscored: true }
  );

  return User;
};
