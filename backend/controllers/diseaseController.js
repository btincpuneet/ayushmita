const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

const { Disease } = require("../models/disease");
const { Treatment } = require("../models/treatment");

const createDisease = async (req, res) => {
  try {
    const {
      name,
      slug,
      short_description,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      image_alt,
      image_title,
      status,
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Disease name and slug are required",
      });
    }

    const existing = await Disease.findOne({ where: { slug } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists",
      });
    }

    let imageUrl = null;

    if (req.file) {
      const uploadDir = path.join(__dirname, "../uploads/diseases");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const imageName = `disease_${Date.now()}.jpg`;
      fs.writeFileSync(
        path.join(uploadDir, imageName),
        req.file.buffer
      );

      imageUrl = `/uploads/diseases/${imageName}`;
    }

    const disease = await Disease.create({
      name,
      slug,
      image: imageUrl,
      image_alt,
      image_title,
      short_description,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status: Number(status) || 1,
    });

    return res.status(201).json({
      success: true,
      message: "Disease created successfully",
      data: disease,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create disease",
    });
  }
};

const getDiseaseById = async (req, res) => {
  try {
    const disease = await Disease.findByPk(req.params.id, {
      include: [
        { model: Treatment, as: "treatments", required: false }
      ],
    });

    if (!disease)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, disease });

  } catch (error) {
    console.error("GET BY ID ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: diseases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch diseases",
      error: error.message,
    });
  }
};


const getAllDiseasesWithTreatments = async (req, res) => {
  try {
    const diseases = await Disease.findAll({
      where: { status: 1 },
      include: [
        {
          model: Treatment,
          as: "treatments",
          attributes: ["id", "name", "slug"]
        }
      ],
      order: [
        ["id", "ASC"],
        [{ model: Treatment, as: "treatments" }, "id", "ASC"]
      ]
    });

    return res.json({
      success: true,
      data: diseases,
    });
  } catch (error) {
    console.error("Disease API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const getDiseaseWithTreatments = async (req, res) => {
  try {
    const disease = await Disease.findOne({
      where: { slug: req.params.slug, status: 1 },
      include: [
        {
          model: Treatment,
          as: "treatments",
          where: { status: 1 },
          required: false,
        },
      ],
    });

    if (!disease)
      return res.status(404).json({ success: false, message: "Disease not found" });

    res.json({ success: true, disease });

  } catch (error) {
    console.error("GET SLUG ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateDisease = async (req, res) => {
  try {
    const disease = await Disease.findByPk(req.params.id);

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: "Disease not found",
      });
    }

    const data = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== "" && req.body[key] !== null) {
        data[key] = req.body[key];
      }
    });

    if (data.slug && data.slug !== disease.slug) {
      const exists = await Disease.findOne({
        where: {
          slug: data.slug,
          id: { [Op.ne]: disease.id },
        },
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Slug already exists",
        });
      }
    }

    if (req.file) {
      const uploadDir = path.join(__dirname, "../uploads/diseases");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const imageName = `disease_${Date.now()}.jpg`;
      fs.writeFileSync(
        path.join(uploadDir, imageName),
        req.file.buffer
      );

      if (disease.image) {
        const oldImage = path.join(__dirname, "..", disease.image);
        if (fs.existsSync(oldImage)) fs.unlinkSync(oldImage);
      }

      data.image = `/uploads/diseases/${imageName}`;
    }

    await disease.update(data);

    res.json({
      success: true,
      message: "Disease updated successfully",
      data: disease,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update disease",
    });
  }
};




const deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findByPk(req.params.id);

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: "Disease not found",
      });
    }

    if (disease.image) {
      const imagePath = path.join(__dirname, "..", disease.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await disease.destroy();

    res.json({
      success: true,
      message: "Disease and image deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDisease,
  getAllDiseasesWithTreatments,
  getDiseaseWithTreatments,
  getDiseaseById,
  updateDisease,
  deleteDisease,
  getAllDiseases
};
