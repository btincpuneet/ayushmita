const express = require("express");
const router = express.Router();
const blogController = require("../../controllers/blogController");
const multer = require("multer");
const { authenticateToken } = require('../../middleware/authMiddleware');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  },
});

router.post(
  "/blogs",
  upload.single("blog_image"),
  authenticateToken,
  blogController.createBlog
);
router.get("/blogs/slug/:slug", blogController.getBlogBySlug);

router.put(
  "/blogs/:id",
  upload.single("blog_image"),
  authenticateToken,
  blogController.updateBlog
);
router.get("/blogs/recent", blogController.getRecentBlogs);


router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlogById);
router.delete("/blogs/:id",authenticateToken , blogController.deleteBlog);

module.exports = router;