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
      status,
    } = req.body;

    let imageUrl = null;

    if (req.file) {
      const imageName = `disease_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads/diseases");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/diseases/${imageName}`;
    }

    const disease = await Disease.create({
      name,
      slug,
      image: imageUrl,
      short_description,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status: Number(status) || 1
    });

    return res.status(201).json({
      success: true,
      message: "Disease created successfully",
      disease_id: disease.id,
      data: disease,
    });

  } catch (error) {
    console.error("CREATE DISEASE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
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
    const id = Number(req.params.id);

    const disease = await Disease.findByPk(id);
    if (!disease)
      return res.status(404).json({ success: false, message: "Not found" });

    let data = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== "" && req.body[key] !== undefined && req.body[key] !== null) {
        data[key] = req.body[key];
      }
    });

    // IMAGE CHANGE
    if (req.file) {
      const uploadDir = path.join(__dirname, "../uploads/diseases");

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const imageName = `disease_${Date.now()}.jpg`;
      const uploadPath = path.join(uploadDir, imageName);

      fs.writeFileSync(uploadPath, req.file.buffer);

      // REMOVE OLD IMAGE
      if (disease.image) {
        const oldPath = path.join(__dirname, "..", disease.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      data.image = `/uploads/diseases/${imageName}`;
    }

    await disease.update(data);

    res.json({ success: true, message: "Disease updated", data: disease });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findByPk(req.params.id);
    if (!disease)
      return res.status(404).json({ success: false, message: "Not found" });

    await disease.destroy();

    res.json({ success: true, message: "Deleted successfully" });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDisease,
  getAllDiseasesWithTreatments,
  getDiseaseWithTreatments,
  getDiseaseById,
  updateDisease,
  deleteDisease,
};
