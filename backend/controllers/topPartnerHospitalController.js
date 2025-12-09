const { TopPartnerHospital } = require("../models/topPartnerHospital");


const createHospital = async (req, res) => {
  try {
    const { name, country, city, description } = req.body;
    console.log("njnj" ,  name, country, city, description);
    
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

    const imageBuffer = req.file.buffer;

    const newHospital = await TopPartnerHospital.create({
      name,
      country,
      city,
      description,
      image_url: imageBuffer,
    });

    return res.status(201).json({
      success: true,
      data: newHospital,
    });

  } catch (err) {
    console.error("Create Hospital Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await TopPartnerHospital.findAll();

    return res.status(200).json({
      success: true,
      data: hospitals,
    });

  } catch (err) {
    console.error("Get All Hospitals Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: hospital,
    });

  } catch (err) {
    console.error("Get Hospital Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateHospital = async (req, res) => {
  try {
    const { name, country, city, description } = req.body;

    const hospital = await TopPartnerHospital.findByPk(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const updatedImage = req.file ? req.file.buffer : hospital.image_url;

    await hospital.update({
      name,
      country,
      city,
      description,
      image_url: updatedImage,
    });

    return res.status(200).json({
      success: true,
      message: "Hospital updated successfully",
      data: hospital,
    });

  } catch (err) {
    console.error("Update Hospital Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    await hospital.destroy();

    return res.status(200).json({
      success: true,
      message: "Hospital deleted successfully",
    });

  } catch (err) {
    console.error("Delete Hospital Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
};
