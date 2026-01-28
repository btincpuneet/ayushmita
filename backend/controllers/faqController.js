const { FAQ } = require("../models/faq");
const { Doctor } = require("../models/doctor");
const { TopPartnerHospital } = require("../models/topPartnerHospital");

exports.createFAQ = async (req, res) => {
  try {
    const {
      question,
      answer,
      sort_order = 0,
      status = 1,
      faq_type = "home",
      hospital_id = null,
      doctor_id = null,
    } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required",
      });
    }

    const exists = await FAQ.findOne({
      where: {
        question: question.trim(),
        faq_type,
        hospital_id,
        doctor_id,
      },
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "This question already exists for this page",
      });
    }

    const faq = await FAQ.create({
      question: question.trim(),
      answer,
      sort_order,
      status,
      faq_type,
      hospital_id,
      doctor_id,
    });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create FAQ",
      error: error.message,
    });
  }
};

exports.getActiveFAQs = async (req, res) => {
  try {
    const { faq_type = "home", hospital_id, doctor_id } = req.query;

    const whereClause = {
      status: 1,
      faq_type,
    };

    if (faq_type === "hospital" && hospital_id) {
      whereClause.hospital_id = hospital_id;
    }

    if (faq_type === "doctor" && doctor_id) {
      whereClause.doctor_id = doctor_id;
    }

    const faqs = await FAQ.findAll({
      where: whereClause,
      order: [
        ["sort_order", "ASC"],
        ["id", "DESC"],
      ],
    });

    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    console.error("getFAQs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs",
      error: error.message,
    });
  }
};

exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.findAll({
      order: [["sort_order", "ASC"]],
      include: [
        {
          model: TopPartnerHospital,
          as: "hospital",
          attributes: ["id", "name"],
          required: false,
        },
        {
          model: Doctor,
          as: "doctor",
          attributes: ["id", "name"],
          required: false,
        },
      ],
    });

    res.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error("FAQ fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs",
      error: error.message,
    });
  }
};


exports.getFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.json({
      success: true,
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQ",
      error: error.message,
    });
  }
};
exports.updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    const {
      question,
      faq_type,
      hospital_id,
      doctor_id,
    } = req.body;

    // 🔒 Check duplicate (excluding current FAQ)
    if (question) {
      const exists = await FAQ.findOne({
        where: {
          question: question.trim(),
          faq_type: faq_type ?? faq.faq_type,
          hospital_id: hospital_id ?? faq.hospital_id,
          doctor_id: doctor_id ?? faq.doctor_id,
          id: { [require("sequelize").Op.ne]: faq.id },
        },
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Duplicate question already exists on this page",
        });
      }
    }

    await faq.update(req.body);

    res.json({
      success: true,
      message: "FAQ updated successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update FAQ",
      error: error.message,
    });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    await faq.destroy();

    res.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete FAQ",
      error: error.message,
    });
  }
};
exports.getHospitalDropdown = async (req, res) => {
 
  try {
    const hospitals = await TopPartnerHospital.findAll({
      attributes: ["id", "name"],
      where: { status: "active" },
      order: [["name", "ASC"]],
    });

    console.log("🔥 Hospitals found:", hospitals.length);

    return res.json({
      success: true,
      data: hospitals,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hospitals",
    });
  }
};



exports.getDoctorDropdown = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: ["id", "name"],
      where: { status: 1 },
      order: [["name", "ASC"]],
    });

    res.json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};
