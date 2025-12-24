const { ContactUs } = require("../models/contact");


const createContactUs = async (req, res) => {
  try {
    const { title, content_html, status } = req.body;

    if (!title || !content_html) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const section = await ContactUs.create({
      title,
      content_html,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Contact Us section created successfully",
      data: section,
    });
  } catch (error) {
    console.error("CREATE CONTACT US ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllContactUs = async (req, res) => {
  try {
    const sections = await ContactUs.findAll({
      where: {
        status: "active",
        deleted_at: null,
      },
      order: [["id", "ASC"]],
    });

    res.json({ success: true, data: sections });
  } catch (error) {
    console.error("GET CONTACT US ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getContactUsById = async (req, res) => {
  try {
    const section = await ContactUs.findOne({
      where: {
        id: req.params.id,
        status: "active",
        deleted_at: null,
      },
    });

    if (!section)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: section });
  } catch (error) {
    console.error("GET CONTACT US BY ID ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateContactUs = async (req, res) => {
  try {
    const section = await ContactUs.findOne({
      where: {
        id: req.params.id,
        deleted_at: null,
      },
    });

    if (!section)
      return res.status(404).json({ success: false, message: "Not found" });

    let data = {};

    Object.keys(req.body).forEach((key) => {
      if (
        req.body[key] !== undefined &&
        req.body[key] !== null &&
        req.body[key] !== ""
      ) {
        data[key] = req.body[key];
      }
    });

    await section.update(data);

    res.json({
      success: true,
      message: "Contact Us section updated",
      data: section,
    });
  } catch (error) {
    console.error("UPDATE CONTACT US ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteContactUs = async (req, res) => {
  try {
    const section = await ContactUs.findByPk(req.params.id);

    if (!section)
      return res.status(404).json({ success: false, message: "Not found" });

    await section.update({ deleted_at: new Date() });

    res.json({
      success: true,
      message: "Contact Us section deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CONTACT US ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getActiveContactUs = async (req, res) => {
  try {
    const sections = await ContactUs.findAll({
      where: {
        status: "active",
        deleted_at: null,
      },
      order: [["id", "ASC"]],
    });

    res.json({
      success: true,
      data: sections,
    });
  } catch (error) {
    console.error("GET ACTIVE CONTACT US ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createContactUs,
  getAllContactUs,
  getContactUsById,
  getActiveContactUs,
  updateContactUs,
  deleteContactUs,
};
