const { Category } = require("../models/category");

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

    /* ===============================
       Basic Required Field Validation
    ================================ */
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required and must be a valid string",
      });
    }

    

    if (
      is_include_top_nav !== undefined &&
      typeof is_include_top_nav !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "is_include_top_nav must be a boolean value",
      });
    }

    const existingCategory = await Category.findOne({
      where: { name: name.trim() },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    /* ===============================
       Sort Order Logic
    ================================ */
    const maxOrder = await Category.max("sort_order");
    const sort_order = maxOrder ? maxOrder + 1 : 1;

    /* ===============================
       Create Category
    ================================ */
    const category = await Category.create({
      name: name.trim(),
      description: description || null,
      status,
      image: image || null,
      url: url || null,
      is_include_top_nav: is_include_top_nav ?? false,
      sort_order,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    console.error("Create Category Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};


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

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
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

   
    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Category name must be a valid string",
        });
      }

      const existingCategory = await Category.findOne({
        where: {
          name: name.trim(),
          id: { [require("sequelize").Op.ne]: categoryId },
        },
      });

      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Category with this name already exists",
        });
      }

      category.name = name.trim();
    }


    
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (url !== undefined) category.url = url;

    if (is_include_top_nav !== undefined) {
      if (typeof is_include_top_nav !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "is_include_top_nav must be a boolean value",
        });
      }
      category.is_include_top_nav = is_include_top_nav;
    }

    if (sort_order !== undefined) {
      const order = Number(sort_order);
      if (isNaN(order) || order < 1) {
        return res.status(400).json({
          success: false,
          message: "Sort order must be a valid positive number",
        });
      }
      category.sort_order = order;
    }

    await category.save();

    return res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (err) {
    console.error("Update Category Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};


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