const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blogController');

// Create Blog
router.post('/blogs', blogController.createBlog);

// Get all Blogs
router.get('/blogs', blogController.getAllBlogs);

// Get single Blog
router.get('/blogs/:id', blogController.getBlogById);

// Update Blog
router.put('/blogs/:id', blogController.updateBlog);

// Delete Blog
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;
