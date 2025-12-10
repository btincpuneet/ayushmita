const fs = require("fs");
const path = require("path");
const { Testimonial } = require("../models/testimonial");

// ---------------------- CREATE ----------------------
const createTestimonial = async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    let imageUrl = null;

    if (req.file) {
      const imageName = `testimonial_${Date.now()}.jpg`;

      const uploadDir = path.join(__dirname, "../uploads/testimonials");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/testimonials/${imageName}`;
    }

    const testimonial = await Testimonial.create({
      name,
      message,
      rating,
      image_url: imageUrl,
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    console.error("Create Testimonial Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- GET ALL ----------------------
const getAllTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json({ success: true, data });
  } catch (err) {
    console.error("Get All Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- GET ONE ----------------------
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: testimonial });
  } catch (err) {
    console.error("Get Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- UPDATE ----------------------
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Not found" });

    const { name, message, rating, status } = req.body;

    let imageUrl = testimonial.image_url;

    if (req.file) {
      const imageName = `testimonial_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads/testimonials");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/testimonials/${imageName}`;
    }

    await testimonial.update({
      name,
      message,
      rating,
      status,
      image_url: imageUrl,
    });

    res.json({ success: true, data: testimonial });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- DELETE ----------------------
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Not found" });

    await testimonial.destroy();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
