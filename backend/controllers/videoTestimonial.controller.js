const { Op } = require("sequelize");
const { VideoTestimonial } = require("../models/videotestimonial");

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const createVideoTestimonial = async (req, res) => {
  try {
    const { name, slug, editor_content, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const finalSlug = slug ? slug : generateSlug(name);

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
const getActiveVideoTestimonials = async (req, res) => {
  try {
    const data = await VideoTestimonial.findAll({
      where: { status: "active" },
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getVideoTestimonialBySlug = async (req, res) => {
  try {
    const testimonial = await VideoTestimonial.findOne({
      where: { slug: req.params.slug },
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

    // slug uniqueness check
    if (data.slug && data.slug !== testimonial.slug) {
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
