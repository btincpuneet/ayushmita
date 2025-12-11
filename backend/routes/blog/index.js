const express = require("express");
const router = express.Router();
const blogController = require("../../controllers/blogController");
const multer = require("multer");

// Multer setup (same as doctor)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  },
});

// Create Blog with image
router.post("/blogs", upload.single("image"), blogController.createBlog);

// Get all Blogs
router.get("/blogs", blogController.getAllBlogs);

// Get Blog by ID
router.get("/blogs/:id", blogController.getBlogById);

// Update Blog (with image optional)
router.put("/blogs/:id", upload.single("image"), blogController.updateBlog);

// Delete Blog
router.delete("/blogs/:id", blogController.deleteBlog);

module.exports = router;
