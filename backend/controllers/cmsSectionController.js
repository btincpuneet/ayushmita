const { CmsSection } = require("../models/cmspage");

exports.createPage = async (req, res) => {
  try {
    const { title, slug, content_html, content_json, status } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required",
      });
    }

    const exists = await CmsSection.findOne({
      where: { slug, deleted_at: null },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }

    const page = await CmsSection.create({
      title,
      slug,
      content_html,
      content_json,
      status,
    });

    res.status(201).json({
      success: true,
      message: "CMS page created successfully",
      data: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPages = async (req, res) => {
  try {
    const pages = await CmsSection.findAll({
      where: { deleted_at: null },
      order: [["created_at", "DESC"]],
    });

    res.json({ success: true, data: pages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPageById = async (req, res) => {
  try {
    const page = await CmsSection.findOne({
      where: { id: req.params.id, deleted_at: null },
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const page = await CmsSection.findByPk(req.params.id);

    if (!page || page.deleted_at) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    await page.update(req.body);

    res.json({
      success: true,
      message: "CMS page updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const page = await CmsSection.findByPk(req.params.id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    await page.update({ deleted_at: new Date() });

    res.json({
      success: true,
      message: "CMS page deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const page = await CmsSection.findByPk(req.params.id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    const newStatus = page.status === "active" ? "inactive" : "active";
    await page.update({ status: newStatus });

    res.json({
      success: true,
      message: `Page ${newStatus} successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPageBySlug = async (req, res) => {
  try {
    const page = await CmsSection.findOne({
      where: {
        slug: req.params.slug,
        status: "active",
        deleted_at: null,
      },
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
