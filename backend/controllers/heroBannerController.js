const { HeroBanner } = require("../models/heroBanner");
const { sequelize } = require("../models/index");
const { Op } = require("sequelize");


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

    const image = req.file
      ? `/uploads/hero-banners/${req.file.filename}`
      : null;

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: "Title and image are required",
      });
    }

    const finalStatus = status === "active" ? "active" : "inactive";
    const finalSortOrder = Number(sort_order) || 0;

    let newHero;

    await sequelize.transaction(async (t) => {
      // Only one active banner allowed
      if (finalStatus === "active") {
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
          status: finalStatus,
          sort_order: finalSortOrder,
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
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getAllHeroBanners = async (req, res) => {
  try {
    const heroes = await HeroBanner.findAll({
      order: [
        ["sort_order", "ASC"],
        ["id", "DESC"],
      ],
    });

    res.status(200).json({
      success: true,
      message: "Hero banners fetched",
      data: heroes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getHeroBannerById = async (req, res) => {
  try {
    const hero = await HeroBanner.findByPk(req.params.id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hero banner fetched",
      data: hero,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const updateHeroBanner = async (req, res) => {
  try {
    const hero = await HeroBanner.findByPk(req.params.id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero banner not found",
      });
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

    const newImage = req.file
      ? `/uploads/hero-banners/${req.file.filename}`
      : hero.image;

    const finalStatus =
      status === "active"
        ? "active"
        : status === "inactive"
        ? "inactive"
        : hero.status;

    await sequelize.transaction(async (t) => {
      if (finalStatus === "active") {
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
          status: finalStatus,
          sort_order:
            sort_order !== undefined
              ? Number(sort_order)
              : hero.sort_order,
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
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const deleteHeroBanner = async (req, res) => {
  try {
    const hero = await HeroBanner.findByPk(req.params.id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero banner not found",
      });
    }

    await hero.destroy();

    res.status(200).json({
      success: true,
      message: "Hero banner deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getActiveHeroBanners = async (req, res) => {
  try {
    const heroes = await HeroBanner.findAll({
      where: { status: "active" }, 
      order: [
        ["sort_order", "ASC"],
        ["id", "DESC"],
      ],
    });

    res.status(200).json({
      success: true,
      data: heroes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createHeroBanner,
  getAllHeroBanners,
  getHeroBannerById,
  updateHeroBanner,
  deleteHeroBanner,
  getActiveHeroBanners
};
