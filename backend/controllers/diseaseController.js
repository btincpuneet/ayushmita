const { Disease } = require("../models/disease");
const { Treatment } = require("../models/treatment");

// =========================
// CREATE DISEASE
// =========================
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

    console.log("REQUEST BODY:", req.body);
    console.log("REQUEST FILE:", req.file);

    const image = req.file ? `/uploads/diseases/${req.file.filename}` : null;

    const disease = await Disease.create({
      name,
      slug,
      image,
      short_description,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status,
    });

    return res.json({ success: true, disease });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================
// GET ALL DISEASES
// =========================
const getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.findAll({
      where: { status: 1 },
      order: [["id", "DESC"]],
    });

    return res.json({ success: true, diseases });
  } catch (error) {
    console.error("FETCH ALL ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================
// GET DISEASE WITH TREATMENTS
// =========================
const getDiseaseWithTreatments = async (req, res) => {
  try {
    const { slug } = req.params;

    const disease = await Disease.findOne({
      where: { slug, status: 1 },
      include: [
        {
          model: Treatment,
          as: "treatments",
          where: { status: 1 },
          required: false,
        },
      ],
    });

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: "Disease not found",
      });
    }

    return res.json({ success: true, disease });
  } catch (error) {
    console.error("FETCH WITH TREATMENTS ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================
// UPDATE DISEASE
// =========================
const updateDisease = async (req, res) => {
  try {
    const { id } = req.params;

    const disease = await Disease.findByPk(id);
    if (!disease)
      return res.status(404).json({ success: false, message: "Not found" });

    const data = req.body;

    if (req.file) data.image = `/uploads/diseases/${req.file.filename}`;

    await disease.update(data);

    return res.json({ success: true, disease });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================
// DELETE DISEASE
// =========================
const deleteDisease = async (req, res) => {
  try {
    const { id } = req.params;

    const disease = await Disease.findByPk(id);
    if (!disease)
      return res.status(404).json({ success: false, message: "Not found" });

    await disease.destroy();

    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================
// EXPORT ALL CONTROLLERS
// =========================
module.exports = {
  createDisease,
  getAllDiseases,
  getDiseaseWithTreatments,
  updateDisease,
  deleteDisease,
};
