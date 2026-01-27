const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authenticateToken } = require('../../middleware/authMiddleware');

const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../../controllers/testimonialController");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  }
});

router.post("/testimonials", upload.single("image"), authenticateToken ,createTestimonial);
router.get("/testimonials", getAllTestimonials);
router.get("/testimonials/:id", getTestimonialById);
router.put("/testimonials/:id", upload.single("image"), authenticateToken , updateTestimonial);
router.delete("/testimonials/:id", authenticateToken , deleteTestimonial);

module.exports = router;
