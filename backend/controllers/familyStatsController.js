const { FamilyStats } = require("../models/familyStats");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads/family-stats");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

exports.create = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const fileName = `icon_${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, req.file.buffer);
      payload.icon = `/uploads/family-stats/${fileName}`;
    }

    const data = await FamilyStats.create(payload);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await FamilyStats.findAll({
      order: [
        ["order", "ASC"],
        ["createdAt", "DESC"],
      ],
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const data = await FamilyStats.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "FamilyStats not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const fileName = `icon_${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, req.file.buffer);
      payload.icon = `/uploads/family-stats/${fileName}`;
    }

    const [updated] = await FamilyStats.update(payload, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "FamilyStats not found",
      });
    }

    const data = await FamilyStats.findByPk(req.params.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await FamilyStats.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "FamilyStats not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
