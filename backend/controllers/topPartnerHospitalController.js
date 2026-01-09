const { TopPartnerHospital } = require("../models/topPartnerHospital");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads/hospitals");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const makeSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

/* ================= CREATE ================= */
const createHospital = async (req, res) => {
  try {
    const {
      name,
      country,
      city,
      address,
      founded_year,
      hospital_beds,
      description_html,

      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status,
    } = req.body;

    if (!name || !country || !city || !address) {
      return res.status(400).json({
        success: false,
        message: "Name, country, city & address are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Hospital image is required",
      });
    }

    const fileName = `hospital_${Date.now()}.jpg`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, req.file.buffer);

    const hospital = await TopPartnerHospital.create({
      name,
      slug: makeSlug(name),
      country,
      city,
      address,
      founded_year,
      hospital_beds,
      description_html,

      // ✅ SEO fields
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,

      status: status || "active",
      image_url: `/uploads/hospitals/${fileName}`,
    });

    res.status(201).json({ success: true, data: hospital });
  } catch (err) {
    console.error("Create Hospital Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET BY SLUG ================= */
const getHospitalBySlug = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findOne({
      where: { slug: req.params.slug, status: "active" },
    });

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.json({ success: true, data: hospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET ALL ================= */
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await TopPartnerHospital.findAll({
      order: [["id", "DESC"]],
    });

    res.json({ success: true, data: hospitals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET BY ID ================= */
const getHospitalById = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);
    if (!hospital)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: hospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
const updateHospital = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);
    if (!hospital)
      return res.status(404).json({ success: false, message: "Not found" });

    let imagePath = hospital.image_url;

    if (req.file) {
      const fileName = `hospital_${Date.now()}.jpg`;
      fs.writeFileSync(
        path.join(uploadDir, fileName),
        req.file.buffer
      );
      imagePath = `/uploads/hospitals/${fileName}`;
    }

    const updateData = {
      ...req.body,
      image_url: imagePath,
    };

    if (req.body.name) {
      updateData.slug = makeSlug(req.body.name);
    }

    await hospital.update(updateData);

    res.json({ success: true, message: "Updated", data: hospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);
    if (!hospital)
      return res.status(404).json({ success: false, message: "Not found" });

    await hospital.destroy();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
  getHospitalBySlug,
};
