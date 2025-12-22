const express = require("express");
const router = express.Router();
const blogController = require("../../controllers/blogController");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  },
});

router.post("/blogs", upload.single("image"), blogController.createBlog);

router.get("/blogs", blogController.getAllBlogs);

router.get("/blogs/:id", blogController.getBlogById);

router.put("/blogs/:id", upload.single("image"), blogController.updateBlog);

router.delete("/blogs/:id", blogController.deleteBlog);

module.exports = router;
