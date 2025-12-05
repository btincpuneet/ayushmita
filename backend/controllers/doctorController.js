const { Doctor } = require("../models/doctor");

// ==============================
// CREATE DOCTOR
// ==============================
const createDoctor = async (req, res) => {
  try {
    const {
      name,
      title,
      specialty,
      description,
      status
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Doctor image is required",
      });
    }

    const doctor = await Doctor.create({
      name,
      title,
      specialty,
      description,
      status,
      image_url: req.file.buffer, // Store buffer BLOB
    });

    return res.status(201).json({
      success: true,
      data: {
        ...doctor.get(),
        image_base64: doctor.image_url.toString("base64"),
      },
    });

  } catch (err) {
    console.error("Create Doctor Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ==============================
// GET ALL DOCTORS
// ==============================
const getDoctors = async (req, res) => {
  try {
    const list = await Doctor.findAll();

    const formatted = list.map((doc) => {
      const d = doc.get();

      return {
        ...d,
        image_base64: d.image_url
          ? d.image_url.toString("base64")
          : null,
      };
    });

    res.json({
      success: true,
      data: formatted,
    });

  } catch (err) {
    console.error("Get Doctors Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// ==============================
// GET SINGLE DOCTOR
// ==============================
const getDoctorById = async (req, res) => {
  try {
    const id = req.params.id;

    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const data = doctor.get();

    data.image_base64 = data.image_url
      ? data.image_url.toString("base64")
      : null;

    res.json({ success: true, data });

  } catch (err) {
    console.error("Get Doctor Error:", err);
    res.status(500).json({ success: false });
  }
};


// ==============================
// UPDATE DOCTOR
// ==============================
const updateDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const {
      name,
      title,
      specialty,
      description,
      status
    } = req.body;

    const updateData = {
      name,
      title,
      specialty,
      description,
      status,
    };

    if (req.file) {
      updateData.image_url = req.file.buffer;
    }

    await doctor.update(updateData);

    const updated = doctor.get();

    updated.image_base64 = updated.image_url
      ? updated.image_url.toString("base64")
      : null;

    res.json({
      success: true,
      data: updated,
    });

  } catch (err) {
    console.error("Update Doctor Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// ==============================
// DELETE DOCTOR
// ==============================
const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;

    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctor.destroy();

    res.json({
      success: true,
      message: "Doctor deleted",
    });

  } catch (err) {
    console.error("Delete Doctor Error:", err);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
