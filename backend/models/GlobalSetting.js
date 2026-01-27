const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const GlobalSetting = sequelize.define(
  "GlobalSetting",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email_host: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "smtp.gmail.com",
    },

    email_port: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 587,
    },

    email_user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    email_pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    admin_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    whatsapp_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    contact_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    appointment_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    seo_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    seo_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    seo_keywords: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Comma separated SEO keywords",
    },

    email_template_html: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      comment: "HTML email template editable from admin editor",
    },
  },
  {
    tableName: "global_settings",
    timestamps: true,
    underscored: true,
  }
);

module.exports = { GlobalSetting };
