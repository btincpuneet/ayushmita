const { Category } = require("../models/category");

/* ================= CREATE ================= */
exports.createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      image,
      url,
      is_include_top_nav,
    } = req.body;

    const maxOrder = await Category.max("sort_order");
    const sort_order = maxOrder ? maxOrder + 1 : 1;

    const category = await Category.create({
      name,
      description,
      status,
      image,
      url,
      is_include_top_nav,
      sort_order,
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ALL ================= */
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["sort_order", "ASC"]],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    const {
      name,
      description,
      status,
      image,
      url,
      is_include_top_nav,
      sort_order, // ✅ IMPORTANT
    } = req.body;

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (status !== undefined) category.status = status;
    if (image !== undefined) category.image = image;
    if (url !== undefined) category.url = url;
    if (typeof is_include_top_nav === "boolean")
      category.is_include_top_nav = is_include_top_nav;

    // ✅ THIS WAS MISSING
    if (sort_order !== undefined)
      category.sort_order = Number(sort_order);

    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.destroy();

    // 🔁 Reorder remaining
    const remaining = await Category.findAll({
      order: [["sort_order", "ASC"]],
    });

    for (let i = 0; i < remaining.length; i++) {
      remaining[i].sort_order = i + 1;
      await remaining[i].save();
    }

    res.json({ message: "Deleted & reordered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};