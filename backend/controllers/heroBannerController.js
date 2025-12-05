const { HeroBanner } = require("../models/heroBanner");
const { sequelize } = require("../models/index");
const { Op } = require("sequelize");

// =========================
// CREATE HERO BANNER
// =========================
const createHeroBanner = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      button_text,
      button_url,
      status,
      sort_order,
    } = req.body;

    // File uploaded?
    const image = req.file ? `/uploads/hero-banners/${req.file.filename}` : null;

    if (!title || !image) {
      return res
        .status(400)
        .json({ success: false, message: "Title and image are required" });
    }

    const requestedStatus = status === "active" ? "active" : "inactive";

    let newHero;

    await sequelize.transaction(async (t) => {
      if (requestedStatus === "active") {
        await HeroBanner.update(
          { status: "inactive" },
          { where: { status: "active" }, transaction: t }
        );
      }

      newHero = await HeroBanner.create(
        {
          title,
          subtitle,
          description,
          image,
          button_text,
          button_url,
          status: requestedStatus,
          sort_order,
        },
        { transaction: t }
      );
    });

    res.status(201).json({
      success: true,
      message: "Hero banner created successfully",
      data: newHero,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =========================
// GET ALL HERO BANNERS
// =========================
const getAllHeroBanners = async (req, res) => {
  try {
    const heroes = await HeroBanner.findAll({
      order: [["sort_order", "ASC"]],
    });

    res.status(200).json({
      success: true,
      message: "Hero banners fetched",
      data: heroes,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =========================
// GET HERO BANNER BY ID
// =========================
const getHeroBannerById = async (req, res) => {
  try {
    const hero = await HeroBanner.findByPk(req.params.id);

    if (!hero) {
      return res
        .status(404)
        .json({ success: false, message: "Hero banner not found" });
    }

    res.status(200).json({
      success: true,
      message: "Hero banner fetched",
      data: hero,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =========================
// UPDATE HERO BANNER
// =========================
const updateHeroBanner = async (req, res) => {
  try {
    const hero = await HeroBanner.findByPk(req.params.id);

    if (!hero) {
      return res
        .status(404)
        .json({ success: false, message: "Hero banner not found" });
    }

    const {
      title,
      subtitle,
      description,
      button_text,
      button_url,
      status,
      sort_order,
    } = req.body;

    // New upload?
    const newImage = req.file
      ? `/uploads/hero-banners/${req.file.filename}`
      : hero.image;

    const requestedStatus =
      status === "active"
        ? "active"
        : status === "inactive"
        ? "inactive"
        : hero.status;

    await sequelize.transaction(async (t) => {
      if (requestedStatus === "active") {
        await HeroBanner.update(
          { status: "inactive" },
          {
            where: {
              status: "active",
              id: { [Op.ne]: hero.id },
            },
            transaction: t,
          }
        );
      }

      await hero.update(
        {
          title: title ?? hero.title,
          subtitle: subtitle ?? hero.subtitle,
          description: description ?? hero.description,
          image: newImage,
          button_text: button_text ?? hero.button_text,
          button_url: button_url ?? hero.button_url,
          status: requestedStatus,
          sort_order: sort_order ?? hero.sort_order,
        },
        { transaction: t }
      );
    });

    res.status(200).json({
      success: true,
      message: "Hero banner updated successfully",
      data: hero,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =========================
// DELETE HERO BANNER
// =========================
const deleteHeroBanner = async (req, res) => {
  try {
    const hero = await HeroBanner.findByPk(req.params.id);

    if (!hero) {
      return res
        .status(404)
        .json({ success: false, message: "Hero banner not found" });
    }

    await hero.destroy();

    res.status(200).json({
      success: true,
      message: "Hero banner deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =========================
// EXPORTS
// =========================
module.exports = {
  createHeroBanner,
  getAllHeroBanners,
  getHeroBannerById,
  updateHeroBanner,
  deleteHeroBanner,
};
