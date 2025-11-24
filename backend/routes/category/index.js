const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');

// Create Category
router.post('/categories', categoryController.createCategory);

// Get all Categories
router.get('/categories', categoryController.getAllCategories);

// Update Category
router.put('/categories/:id', categoryController.updateCategory);

// Delete Category
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
