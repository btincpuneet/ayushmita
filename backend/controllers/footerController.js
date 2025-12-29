const { Footer } = require("../models/footer");

const createFooter = async (req, res) => {
  try {
    const {
      title,
      content_html,
      seo_title,
      seo_description,
      seo_keywords,
      status,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const existingFooter = await Footer.findOne({
      where: {
        deleted_at: null,
      },
    });

    if (existingFooter) {
      return res.status(409).json({
        success: false,
        message: "Footer already created",
        data: existingFooter,
      });
    }

    const footer = await Footer.create({
      title,
      content_html,
      seo_title,
      seo_description,
      seo_keywords,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Footer section created successfully",
      data: footer,
    });
  } catch (error) {
    console.error("CREATE FOOTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllFooter = async (req, res) => {
  try {
    const footers = await Footer.findAll({
      where: { deleted_at: null },
      order: [["id", "ASC"]],
    });

    res.json({
      success: true,
      data: footers,
    });
  } catch (error) {
    console.error("GET FOOTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getActiveFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne({
      where: {
        status: "active",
        deleted_at: null,
      },
    });

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found",
      });
    }

    res.json({
      success: true,
      data: footer,
    });
  } catch (error) {
    console.error("GET ACTIVE FOOTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFooterById = async (req, res) => {
  try {
    const footer = await Footer.findOne({
      where: {
        id: req.params.id,
        deleted_at: null,
      },
    });

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found",
      });
    }

    res.json({
      success: true,
      data: footer,
    });
  } catch (error) {
    console.error("GET FOOTER BY ID ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne({
      where: {
        id: req.params.id,
        deleted_at: null,
      },
    });

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found",
      });
    }

    await footer.update(req.body);

    res.json({
      success: true,
      message: "Footer updated successfully",
      data: footer,
    });
  } catch (error) {
    console.error("UPDATE FOOTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne({
      where: {
        id: req.params.id,
        deleted_at: null,
      },
    });

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found",
      });
    }

    await footer.update({ deleted_at: new Date() });

    res.json({
      success: true,
      message: "Footer deleted successfully",
    });
  } catch (error) {
    console.error("DELETE FOOTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFooter,
  getAllFooter,
  getActiveFooter,
  getFooterById,
  updateFooter,
  deleteFooter,
};
