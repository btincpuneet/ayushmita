const express = require("express");
const router = express.Router();
const blogController = require("../../controllers/blogController");
const multer = require("multer");
console.log("blogController:", blogController);

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
  blogController.createBlog
);

router.put(
  "/blogs/:id",
  upload.single("blog_image"),
  blogController.updateBlog
);
router.get("/blogs/slug/:slug", blogController.getBlogBySlug);

router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlogById);
router.delete("/blogs/:id", blogController.deleteBlog);

module.exports = router;