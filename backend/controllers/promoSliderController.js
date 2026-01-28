const { PromoSlider } = require("../models/promoSlider");
const fs = require("fs");
const path = require("path");

const createPromoSlider = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      discount_text,
      code_text,
      button_text,
      status,
      image_alt,
      image_title,
    } = req.body;

    let imageUrl = null;

    if (req.file) {
      const imageName = `promo_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/${imageName}`;
    }

    const slider = await PromoSlider.create({
      title,
      subtitle,
      description,
      discount_text,
      code_text,
      button_text,
      status,
      image_url: imageUrl,
      image_alt,
      image_title,
    });

    res.status(201).json({
      success: true,
      data: slider,
    });
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET ALL ================= */
const getPromoSliders = async (req, res) => {
  try {
    const items = await PromoSlider.findAll({
      order: [["id", "DESC"]],
    });

    const result = items.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      discount_text: item.discount_text,
      code_text: item.code_text,
      button_text: item.button_text,
      status: item.status,
      image_url: item.image_url,
      image_alt: item.image_alt,     // ✅ FIX
      image_title: item.image_title, // ✅ FIX
    }));

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Get All Error:", err);
    res.status(500).json({ success: false });
  }
};

/* ================= GET BY ID ================= */
const getPromoSliderById = async (req, res) => {
  try {
    const promo = await PromoSlider.findByPk(req.params.id);

    if (!promo) {
      return res
        .status(404)
        .json({ success: false, message: "Promo not found" });
    }

    res.json({
      success: true,
      data: {
        id: promo.id,
        title: promo.title,
        subtitle: promo.subtitle,
        description: promo.description,
        discount_text: promo.discount_text,
        code_text: promo.code_text,
        button_text: promo.button_text,
        status: promo.status,
        image_url: promo.image_url,
        image_alt: promo.image_alt,     // ✅ FIX
        image_title: promo.image_title, // ✅ FIX
      },
    });
  } catch (err) {
    console.error("Get By ID Error:", err);
    res.status(500).json({ success: false });
  }
};

/* ================= UPDATE ================= */
const updatePromoSlider = async (req, res) => {
  try {
    const promo = await PromoSlider.findByPk(req.params.id);

    if (!promo) {
      return res
        .status(404)
        .json({ success: false, message: "Promo not found" });
    }

    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      discount_text: req.body.discount_text,
      code_text: req.body.code_text,
      button_text: req.body.button_text,
      status: req.body.status,
      image_alt: req.body.image_alt,
      image_title: req.body.image_title,
    };

    if (req.file) {
      const imageName = `promo_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      updateData.image_url = `/uploads/${imageName}`;
    }

    await promo.update(updateData);

    res.json({ success: true, data: promo });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false });
  }
};

/* ================= DELETE ================= */
const deletePromoSlider = async (req, res) => {
  try {
    const promo = await PromoSlider.findByPk(req.params.id);

    if (!promo) {
      return res
        .status(404)
        .json({ success: false, message: "Promo not found" });
    }

    await promo.destroy();
    res.json({ success: true, message: "Promo deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  createPromoSlider,
  getPromoSliders,
  getPromoSliderById,
  updatePromoSlider,
  deletePromoSlider,
};
