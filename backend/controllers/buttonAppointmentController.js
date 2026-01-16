const { ButtonAppointment } = require("../models/buttonAppointment");

const createButton = async (req, res) => {
  try {
    const { name, status, linkUrl } = req.body;

    const button = await ButtonAppointment.create({
      name,
      status,
      linkUrl,
    });

    res.status(201).json({
      success: true,
      data: button,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllButtons = async (req, res) => {
  try {
    const buttons = await ButtonAppointment.findAll({
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      data: buttons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getButtonById = async (req, res) => {
  try {
    const button = await ButtonAppointment.findByPk(req.params.id);

    if (!button) {
      return res.status(404).json({
        success: false,
        message: "Button not found",
      });
    }

    res.json({
      success: true,
      data: button,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateButton = async (req, res) => {
  try {
    const button = await ButtonAppointment.findByPk(req.params.id);

    if (!button) {
      return res.status(404).json({
        success: false,
        message: "Button not found",
      });
    }

    const { name, status, linkUrl } = req.body;

    await button.update({
      name,
      status,
      linkUrl,
    });

    res.json({
      success: true,
      data: button,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteButton = async (req, res) => {
  try {
    const button = await ButtonAppointment.findByPk(req.params.id);

    if (!button) {
      return res.status(404).json({
        success: false,
        message: "Button not found",
      });
    }

    await button.destroy();

    res.json({
      success: true,
      message: "Button deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createButton,
  getAllButtons,
  getButtonById,
  updateButton,
  deleteButton,
};
