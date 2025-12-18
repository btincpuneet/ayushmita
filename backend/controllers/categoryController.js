const { Category } = require("../models/category");

/* ======================================================
   CREATE CATEGORY
====================================================== */
exports.createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      image,
      url,
      is_include_top_nav,
      sort_order,
    } = req.body;

    const category = await Category.create({
      name,
      description,
      status,
      image,
      url,
      is_include_top_nav,
      sort_order,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ======================================================
   GET ALL CATEGORIES (ADMIN)
====================================================== */
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["sort_order", "ASC"], ["name", "ASC"]],
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ======================================================
   GET CATEGORY BY ID
====================================================== */
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ======================================================
   UPDATE CATEGORY
====================================================== */
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const {
      name,
      description,
      status,
      image,
      url,
      is_include_top_nav,
      sort_order,
    } = req.body;

    category.name = name ?? category.name;
    category.description = description ?? category.description;
    category.status = status ?? category.status;
    category.image = image ?? category.image;
    category.url = url ?? category.url;
    category.sort_order = sort_order ?? category.sort_order;
    category.is_include_top_nav =
      typeof is_include_top_nav === "boolean"
        ? is_include_top_nav
        : category.is_include_top_nav;

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ======================================================
   DELETE CATEGORY
====================================================== */
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ======================================================
   GET TOP NAV CATEGORIES (FRONTEND NAVBAR)
====================================================== */
exports.getTopNavCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: {
        status: "active",
        is_include_top_nav: true,
      },
      order: [["sort_order", "ASC"]],
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
