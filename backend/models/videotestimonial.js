const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const VideoTestimonial = sequelize.define(
  "VideoTestimonial",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name: { type: DataTypes.STRING, allowNull: false },

    slug: { type: DataTypes.STRING, allowNull: false, unique: true },

    editor_content: { type: DataTypes.TEXT("long"), allowNull: false },

    status: { type: DataTypes.STRING, defaultValue: "active" },
  },
  {
    tableName: "video_testimonials",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { VideoTestimonial };
