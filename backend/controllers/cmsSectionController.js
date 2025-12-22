const { CmsSection } = require("../models/index.js");

/**
 * CREATE CMS SECTION
 */
exports.createSection = async (req, res) => {
  try {
    const section = await CmsSection.create(req.body);
    res.status(201).json({
      success: true,
      message: "CMS section created successfully",
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE CMS SECTION
 */
exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await CmsSection.findByPk(id);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "CMS section not found",
      });
    }

    await section.update(req.body);

    res.json({
      success: true,
      message: "CMS section updated successfully",
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL CMS SECTIONS (ADMIN)
 */
exports.getAllSections = async (req, res) => {
  try {
    const sections = await CmsSection.findAll({
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      data: sections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET SINGLE CMS SECTION BY SLUG (PUBLIC)
 */
exports.getSectionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const section = await CmsSection.findOne({
      where: { slug, status: "active" },
    });

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "CMS section not found",
      });
    }

    res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE CMS SECTION (SOFT)
 */
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await CmsSection.findByPk(id);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "CMS section not found",
      });
    }

    await section.update({
      status: "inactive",
      deleted_at: new Date(),
    });

    res.json({
      success: true,
      message: "CMS section deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
