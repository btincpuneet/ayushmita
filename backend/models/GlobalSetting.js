module.exports = (sequelize, DataTypes) => {
  const GlobalSetting = sequelize.define(
    "GlobalSetting",
    {
     
      emailHost: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "smtp.gmail.com",
      },

      emailPort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 587,
      },

      emailUser: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },

      emailPass: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      adminEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },

    
      whatsappNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },

      appointmentEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },

      
      seoTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      seoDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      seoKeywords: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Comma separated SEO keywords",
      },

      
      emailTemplateHtml: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        comment: "HTML email template editable from admin editor",
      },
    },
    {
      tableName: "global_settings",
      timestamps: true,
    }
  );

  return GlobalSetting;
};
