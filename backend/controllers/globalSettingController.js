const { GlobalSetting } = require("../models/GlobalSetting");

const getSingleSetting = async () => {
  return await GlobalSetting.findOne();
};

const mapPayload = (body) => ({
  email_host: body.emailHost,
  email_port: body.emailPort,
  email_user: body.emailUser,
  email_pass: body.emailPass,
  admin_email: body.adminEmail,
  whatsapp_number: body.whatsappNumber,
  contact_email: body.contactEmail,
  appointment_email: body.appointmentEmail,
  seo_title: body.seoTitle,
  seo_description: body.seoDescription,
  seo_keywords: body.seoKeywords,
  email_template_html: body.emailTemplateHtml,
});


exports.create = async (req, res) => {
  try {
    const existing = await getSingleSetting();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Global settings already exist. Use update instead.",
      });
    }

    const setting = await GlobalSetting.create(mapPayload(req.body));

    return res.status(201).json({
      success: true,
      message: "Global settings created successfully",
      data: setting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create global settings",
      error: error.message,
    });
  }
};

/**
 * GET
 */
exports.get = async (req, res) => {
  try {
    const setting = await getSingleSetting();

    return res.json({
      success: true,
      data: setting || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch global settings",
      error: error.message,
    });
  }
};


exports.update = async (req, res) => {
  try {
    const setting = await getSingleSetting();
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Global settings not found",
      });
    }

    await setting.update(mapPayload(req.body));

    return res.json({
      success: true,
      message: "Global settings updated successfully",
      data: setting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update global settings",
      error: error.message,
    });
  }
};

/**
 * DELETE
 */
exports.delete = async (req, res) => {
  try {
    const setting = await getSingleSetting();
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Global settings not found",
      });
    }

    await setting.destroy();

    return res.json({
      success: true,
      message: "Global settings deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete global settings",
      error: error.message,
    });
  }
};

/**
 * UPSERT (recommended for admin save button)
 */
exports.upsert = async (req, res) => {
  try {
    const setting = await getSingleSetting();

    const payload = mapPayload(req.body);

    const result = setting
      ? await setting.update(payload)
      : await GlobalSetting.create(payload);

    return res.json({
      success: true,
      message: "Global settings saved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save global settings",
      error: error.message,
    });
  }
};
