const fs = require("fs");
const path = require("path");
const { NewsEvent } = require("../models/newsEvent");

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const saveImage = (file) => {
  const uploadDir = path.join(__dirname, "../uploads/news-events");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, file.buffer);
  return `uploads/news-events/${fileName}`;
};

const deleteImage = (imagePath) => {
  if (!imagePath) return;
  const fullPath = path.join(__dirname, "..", imagePath);
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
};



 
exports.createNewsEvent = async (req, res) => {
  try {
    const { title, editor_content, status } = req.body;

    const image = req.file ? saveImage(req.file) : null;

    const news = await NewsEvent.create({
      title,
      slug: generateSlug(title),
      editor_content,
      image,
      status,
    });

    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getActiveNewsEvents = async (req, res) => {
  try {
    const data = await NewsEvent.findAll({
      where: { status: "active" },
      order: [["created_at", "DESC"]],
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getAllNewsEvents = async (req, res) => {
  try {
    const data = await NewsEvent.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getNewsEventBySlug = async (req, res) => {
  try {
    const data = await NewsEvent.findOne({
      where: { slug: req.params.slug, status: "active" },
    });

    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "News/Event not found" });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateNewsEvent = async (req, res) => {
  try {
    const news = await NewsEvent.findByPk(req.params.id);
    if (!news)
      return res
        .status(404)
        .json({ success: false, message: "Not found" });

    if (req.body.removeImage === "true") {
      deleteImage(news.image);
      news.image = null;
    }

    if (req.file) {
      deleteImage(news.image);
      news.image = saveImage(req.file);
    }

    news.title = req.body.title || news.title;
    news.slug = req.body.title
      ? generateSlug(req.body.title)
      : news.slug;
    news.editor_content =
      req.body.editor_content || news.editor_content;
    news.status = req.body.status || news.status;

    await news.save();

    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteNewsEvent = async (req, res) => {
  try {
    const news = await NewsEvent.findByPk(req.params.id);
    if (!news)
      return res
        .status(404)
        .json({ success: false, message: "Not found" });

    deleteImage(news.image);
    await news.destroy();

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
