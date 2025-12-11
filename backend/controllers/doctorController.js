const { Doctor } = require("../models/doctor");
const fs = require("fs");
const path = require("path");

const createDoctor = async (req, res) => {
  try {
    const { name, title, specialty, description, status } = req.body;

    if (!name) return res.status(400).json({ success: false, message: "Name is required" });
    if (!specialty) return res.status(400).json({ success: false, message: "Specialty is required" });

    let imageUrl = null;

    if (req.file) {
      const imageName = `doctor_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads/doctors");

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/doctors/${imageName}`;
    }

    const doctor = await Doctor.create({
      name,
      title,
      specialty,
      description,
      status: status || 1,
      image_url: imageUrl,
    });

    res.status(201).json({ success: true, data: doctor });
  } catch (err) {
    console.error("Create Doctor Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const list = await Doctor.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    console.error("Get Doctors Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor)
      return res.status(404).json({ success: false, message: "Doctor not found" });

    res.json({ success: true, data: doctor });
  } catch (err) {
    console.error("Get Doctor Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor)
      return res.status(404).json({ success: false, message: "Doctor not found" });

    const { name, title, specialty, description, status } = req.body;

    const updateData = { name, title, specialty, description, status };

    if (req.file) {
      const imageName = `doctor_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads/doctors");

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      updateData.image_url = `/uploads/doctors/${imageName}`;
    }

    await doctor.update(updateData);

    res.json({ success: true, data: doctor });
  } catch (err) {
    console.error("Update Doctor Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor)
      return res.status(404).json({ success: false, message: "Doctor not found" });

    await doctor.destroy();

    res.json({ success: true, message: "Doctor deleted" });
  } catch (err) {
    console.error("Delete Doctor Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
