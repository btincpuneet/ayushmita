// controllers/testimonialController.js

const { Testimonial } = require("../models/testimonial");

// Convert Blob → Base64
function serializeTestimonial(t) {
  const plain = t.toJSON ? t.toJSON() : t;

  if (plain.image_url) {
    let buffer = null;

    // For Sequelize BLOB
    if (Buffer.isBuffer(plain.image_url)) buffer = plain.image_url;

    // For MySQL BLOB stored as {data: []}
    else if (plain.image_url?.data) buffer = Buffer.from(plain.image_url.data);

    if (buffer) {
      plain.image_base64 = buffer.toString("base64");
    }
  }

  delete plain.image_url;
  return plain;
}

// CREATE
const createTestimonial = async (req, res) => {
  try {
    const { name, role, rating, message, status } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: "Name and message are required",
      });
    }

    const imageBuffer = req.file ? req.file.buffer : null;

    const newTestimonial = await Testimonial.create({
      name,
      role,
      rating,
      message,
      status,
      image_url: imageBuffer,
    });

    return res.status(201).json({
      success: true,
      data: serializeTestimonial(newTestimonial),
    });

  } catch (err) {
    console.error("Create Testimonial Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: testimonials.map(serializeTestimonial),
    });
  } catch (err) {
    console.error("Get All Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET BY ID
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.status(200).json({
      success: true,
      data: serializeTestimonial(testimonial),
    });
  } catch (err) {
    console.error("Get Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE
const updateTestimonial = async (req, res) => {
  try {
    const { name, role, rating, message, status } = req.body;

    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const imageBuffer = req.file ? req.file.buffer : testimonial.image_url;

    await testimonial.update({
      name,
      role,
      rating,
      message,
      status,
      image_url: imageBuffer,
    });

    await testimonial.reload();

    return res.status(200).json({
      success: true,
      message: "Updated",
      data: serializeTestimonial(testimonial),
    });
  } catch (err) {
    console.error("Update Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await testimonial.destroy();

    return res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    console.error("Delete Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
