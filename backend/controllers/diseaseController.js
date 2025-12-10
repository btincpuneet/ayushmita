const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

const { Disease } = require("../models/disease");
const { Treatment } = require("../models/treatment");

// CREATE DISEASE
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

    // IMAGE UPLOAD
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

// GET BY ID
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

// GET ALL DISEASES
const getAllDiseases = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, q } = req.query;

    const where = {};
    if (status !== undefined && status !== "") where.status = Number(status);
    if (q) where.name = { [Op.like]: `%${q}%` };

    const offset = (Number(page) - 1) * Number(limit);

    const { rows, count } = await Disease.findAndCountAll({
      where,
      order: [["id", "DESC"]],
      limit: Number(limit),
      offset,
    });

    res.json({
      success: true,
      data: rows,
      total: count,
      page: Number(page),
      limit: Number(limit),
    });

  } catch (error) {
    console.error("GET ALL ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY SLUG WITH TREATMENTS
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

// UPDATE DISEASE
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

// DELETE DISEASE
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
  getAllDiseases,
  getDiseaseWithTreatments,
  getDiseaseById,
  updateDisease,
  deleteDisease,
};
