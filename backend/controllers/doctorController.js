const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const slugify = require("../utils/slugify");

const { Doctor } = require("../models/doctor");
const { TopPartnerHospital } = require("../models/topPartnerHospital");
const { RelationHospitalDoctor } = require("../models/relationHospitalDoctor");


const createDoctor = async (req, res) => {
  try {
    const {
      name,
      title,
      specialty,
      short_description,
      description,
      description_html,
      country,
      city,
      experience,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status,
    } = req.body;

    let hospitals = req.body.hospitals || [];

    if (!name || !specialty) {
      return res.status(400).json({
        success: false,
        message: "Name and specialty are required",
      });
    }

    /* ---------- SLUG ---------- */
    let baseSlug = slugify(name);
    let slug = baseSlug;
    let count = 1;

    while (await Doctor.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    /* ---------- IMAGE ---------- */
    let imageUrl = null;
    if (req.file) {
      const imageName = `doctor_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads/doctors");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, imageName), req.file.buffer);
      imageUrl = `/uploads/doctors/${imageName}`;
    }

    const doctor = await Doctor.create({
      name,
      slug,
      title,
      specialty,
      short_description,
      description,
      description_html,
      country,
      city,
      experience,
      image_url: imageUrl,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status: status ?? 1,
    });

    if (!Array.isArray(hospitals)) hospitals = [hospitals];

    hospitals = hospitals
      .map((id) => Number(id))
      .filter((id) => !isNaN(id));

    const validHospitals = await TopPartnerHospital.findAll({
      where: { id: hospitals },
      attributes: ["id"],
    });

    const relations = validHospitals.map((h) => ({
      doctor_id: doctor.id,
      hospital_id: h.id,
      status: 1,
    }));

    if (relations.length) {
      await RelationHospitalDoctor.bulkCreate(relations);
    }

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (err) {
    console.error("Create Doctor Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ======================================================
   GET ALL DOCTORS
====================================================== */
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [
        {
          model: TopPartnerHospital,
          as: "hospitals",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
      order: [["id", "DESC"]],
    });

    res.json({ success: true, data: doctors });
  } catch (err) {
    console.error("Get Doctors Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getActiveDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      where: { status: 1 },
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDoctorBySlug = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: { slug: req.params.slug, status: 1 },
      include: [
        {
          model: TopPartnerHospital,
          as: "hospitals",
          attributes: ["id", "name", "slug", "city", "country"],
          through: { attributes: [] },
        },
      ],
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({ success: true, data: doctor });
  } catch (err) {
    console.error("Get Doctor By Slug Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    let updateData = { ...req.body };
    let hospitals = req.body.hospitals || [];

    if (req.body.name && req.body.name !== doctor.name) {
      let baseSlug = slugify(req.body.name);
      let slug = baseSlug;
      let count = 1;

      while (
        await Doctor.findOne({
          where: { slug, id: { [Op.ne]: doctor.id } },
        })
      ) {
        slug = `${baseSlug}-${count++}`;
      }

      updateData.slug = slug;
    }

    /* ---------- IMAGE UPDATE ---------- */
    if (req.file) {
      const imageName = `doctor_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads/doctors");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, imageName), req.file.buffer);
      updateData.image_url = `/uploads/doctors/${imageName}`;
    }

    await doctor.update(updateData);

    /* ---------- RESET RELATIONS ---------- */
    await RelationHospitalDoctor.destroy({
      where: { doctor_id: doctor.id },
    });

    if (!Array.isArray(hospitals)) hospitals = [hospitals];

    hospitals = hospitals
      .map((id) => Number(id))
      .filter((id) => !isNaN(id));

    const validHospitals = await TopPartnerHospital.findAll({
      where: { id: hospitals },
      attributes: ["id"],
    });

    const relations = validHospitals.map((h) => ({
      doctor_id: doctor.id,
      hospital_id: h.id,
      status: 1,
    }));

    if (relations.length) {
      await RelationHospitalDoctor.bulkCreate(relations);
    }

    res.json({ success: true, data: doctor });
  } catch (err) {
    console.error("Update Doctor Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ======================================================
   DELETE DOCTOR
====================================================== */
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await RelationHospitalDoctor.destroy({
      where: { doctor_id: doctor.id },
    });

    await doctor.destroy();

    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (err) {
    console.error("Delete Doctor Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorBySlug,
  updateDoctor,
  deleteDoctor,
  getActiveDoctors
};
