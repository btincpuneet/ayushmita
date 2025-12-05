const { PromoSlider } = require("../models/promoSlider");

// CREATE
// const createPromoSlider = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "Image required" });
//     }

//     const {
//       title,
//       subtitle,
//       description,
//       discount_text,
//       code_text,
//       button_text,
//       status,
//     } = req.body;

//     const promo = await PromoSlider.create({
//       title,
//       subtitle,
//       description,
//       discount_text,
//       code_text,
//       button_text,
//       status,
//       image_url: req.file.buffer, // Store binary
//     });

//     const data = promo.get();
//     data.image_base64 = data.image_url.toString("base64");

//     res.json({ success: true, data });
//   } catch (err) {
//     console.error("Create Error:", err);
//     res.status(500).json({ success: false });
//   }
// };
// promoSliderController.js
const fs = require("fs");
const path = require("path");

const createPromoSlider = async (req, res) => {
  try {
    const { title, subtitle, description, discount_text, code_text } = req.body;

    let imageUrl = null;

    if (req.file) {
      const imageName = `promo_${Date.now()}.jpg`;

      // uploads folder path
      const uploadDir = path.join(__dirname, "../uploads");

      // ✅ If uploads folder does NOT exist — create it
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, imageName);

      // Save the image file
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/${imageName}`;
    }

    const newSlider = await PromoSlider.create({
      title,
      subtitle,
      description,
      discount_text,
      code_text,
      image_url: imageUrl,
    });

    return res.status(201).json({
      success: true,
      data: newSlider,
    });

  } catch (err) {
    console.error("Create Slider Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// GET ALL
const getPromoSliders = async (req, res) => {
  try {
    const items = await PromoSlider.findAll();

    const result = items.map((item) => {
      const data = item.get();
      return {
        ...data,
        image_base64: data.image_url ? data.image_url.toString("base64") : null,
      };
    });

    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Get All Error:", err);
    res.status(500).json({ success: false });
  }
};

// GET BY ID
const getPromoSliderById = async (req, res) => {
  try {
    const id = req.params.id;
    const promo = await PromoSlider.findByPk(id);

    if (!promo) {
      return res
        .status(404)
        .json({ success: false, message: "Promo not found" });
    }

    const data = promo.get();
    data.image_base64 = data.image_url
      ? data.image_url.toString("base64")
      : null;

    res.json({ success: true, data });
  } catch (err) {
    console.error("Get By ID Error:", err);
    res.status(500).json({ success: false });
  }
};

// UPDATE
const updatePromoSlider = async (req, res) => {
  try {
    const id = req.params.id;
    const promo = await PromoSlider.findByPk(id);

    if (!promo) {
      return res
        .status(404)
        .json({ success: false, message: "Promo not found" });
    }

    const {
      title,
      subtitle,
      description,
      discount_text,
      code_text,
      button_text,
      status,
    } = req.body;

    const updateData = {
      title,
      subtitle,
      description,
      discount_text,
      code_text,
      button_text,
      status,
    };

    // ⭐ FIXED: Save image to /uploads (same as CREATE)
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

    res.json({
      success: true,
      data: promo,
    });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false });
  }
};



// DELETE
const deletePromoSlider = async (req, res) => {
  try {
    const id = req.params.id;

    const promo = await PromoSlider.findByPk(id);
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
