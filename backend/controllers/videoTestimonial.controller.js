const { Op } = require("sequelize");
const { VideoTestimonial } = require("../models/videotestimonial");

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const createVideoTestimonial = async (req, res) => {
  try {
    const {
      name,
      slug,
      editor_content,
      status,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
    } = req.body;

    if (!name || !editor_content) {
      return res.status(400).json({
        success: false,
        message: "Name and content are required",
      });
    }

    const finalSlug = slug ? generateSlug(slug) : generateSlug(name);

    const exists = await VideoTestimonial.findOne({
      where: { slug: finalSlug },
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists",
      });
    }

    const testimonial = await VideoTestimonial.create({
      name,
      slug: finalSlug,
      editor_content,
      status: status || "active",

      seo_title: seo_title || name,
      seo_description,
      seo_keywords,
      canonical_url,
    });

    res.status(201).json({
      success: true,
      message: "Video testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllVideoTestimonials = async (req, res) => {
  try {
    const data = await VideoTestimonial.findAll({
      order: [["id", "DESC"]],
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 GET ACTIVE
const getActiveVideoTestimonials = async (req, res) => {
  try {
    const data = await VideoTestimonial.findAll({
      where: { status: "active" },
      order: [["id", "DESC"]],
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVideoTestimonialBySlug = async (req, res) => {
  try {
    const testimonial = await VideoTestimonial.findOne({
      where: {
        slug: req.params.slug,
        status: "active",
      },
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Video testimonial not found",
      });
    }

    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateVideoTestimonial = async (req, res) => {
  try {
    const testimonial = await VideoTestimonial.findByPk(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Video testimonial not found",
      });
    }

    const data = {};
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== "" && req.body[key] !== null) {
        data[key] = req.body[key];
      }
    });

    // slug handling
    if (data.slug) {
      data.slug = generateSlug(data.slug);

      const exists = await VideoTestimonial.findOne({
        where: {
          slug: data.slug,
          id: { [Op.ne]: testimonial.id },
        },
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Slug already exists",
        });
      }
    }

    await testimonial.update(data);

    res.json({
      success: true,
      message: "Video testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 DELETE
const deleteVideoTestimonial = async (req, res) => {
  try {
    const testimonial = await VideoTestimonial.findByPk(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Video testimonial not found",
      });
    }

    await testimonial.destroy();

    res.json({
      success: true,
      message: "Video testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVideoTestimonial,
  getAllVideoTestimonials,
  getActiveVideoTestimonials,
  getVideoTestimonialBySlug,
  updateVideoTestimonial,
  deleteVideoTestimonial,
};
