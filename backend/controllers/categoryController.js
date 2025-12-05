const { Category } = require('../models/category');

// Create Category
exports.createCategory = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { name, description, status, image, url, is_include_top_nav } = req.body;
    const newCategory = await Category.create({ name, description, status, image, url, is_include_top_nav });
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const { name, description, status, image, url, is_include_top_nav } = req.body;
    category.name = name || category.name;
    category.description = description || category.description;
    category.status = status || category.status;
    category.image = image !== undefined ? image : category.image;
    category.url = url !== undefined ? url : category.url;
    category.is_include_top_nav = typeof is_include_top_nav === 'boolean' ? is_include_top_nav : category.is_include_top_nav;
    await category.save();
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
