
const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById); 

router.post('/categories', authenticateToken, categoryController.createCategory);
router.put('/categories/:id', authenticateToken, categoryController.updateCategory);
router.delete('/categories/:id', authenticateToken, categoryController.deleteCategory);

module.exports = router;
