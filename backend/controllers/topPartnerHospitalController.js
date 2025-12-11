const { TopPartnerHospital } = require("../models/topPartnerHospital");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads/hospitals");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const createHospital = async (req, res) => {
  try {
    const { name, country, city, description } = req.body;

    if (!name || !country || !city) {
      return res.status(400).json({
        success: false,
        message: "Name, country, and city are required",
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

    const newHospital = await TopPartnerHospital.create({
      name,
      country,
      city,
      description,
      image_url: `/uploads/hospitals/${fileName}`,
    });

    return res.status(201).json({
      success: true,
      data: newHospital,
    });
  } catch (err) {
    console.error("Create Hospital Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await TopPartnerHospital.findAll();
    return res.status(200).json({ success: true, data: hospitals });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);

    if (!hospital) {
      return res.status(404).json({ success: false, message: "Hospital not found" });
    }

    return res.status(200).json({ success: true, data: hospital });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateHospital = async (req, res) => {
  try {
    const { name, country, city, description } = req.body;

    const hospital = await TopPartnerHospital.findByPk(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: "Hospital not found" });
    }

    let imagePath = hospital.image_url;

    if (req.file) {
      const fileName = `hospital_${Date.now()}.jpg`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, req.file.buffer);
      imagePath = `/uploads/hospitals/${fileName}`;
    }

    await hospital.update({
      name,
      country,
      city,
      description,
      image_url: imagePath,
    });

    return res.status(200).json({
      success: true,
      message: "Hospital updated successfully",
      data: hospital,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: "Hospital not found" });
    }

    await hospital.destroy();
    return res.status(200).json({ success: true, message: "Hospital deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
};
