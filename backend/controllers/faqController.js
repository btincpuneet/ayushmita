const { FAQ } = require('../models/faq');
console.log('FAQ Model:', FAQ);
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, sort_order, status } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and Answer are required" });
    }

    const data = await FAQ.create({
      question,
      answer,
      sort_order: sort_order || 0,
      status: status ?? 1,
    });

    res.status(201).json({ message: "FAQ created successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFAQs = async (req, res) => {
  try {
    const data = await FAQ.findAll({
      where: { status: 1 }, 
      order: [
        ["sort_order", "ASC"],
        ["id", "DESC"],
      ],
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE FAQ
exports.updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    await faq.update(req.body);

    res.json({ message: "FAQ updated successfully", faq });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    await faq.destroy();

    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
