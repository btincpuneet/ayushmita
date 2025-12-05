// routes/testimonialRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../../controllers/testimonialController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  },
});

// FINAL ROUTES (/api)
router.post("/testimonials", upload.single("image"), createTestimonial);
router.get("/testimonials", getAllTestimonials);
router.get("/testimonials/:id", getTestimonialById);
router.put("/testimonials/:id", upload.single("image"), updateTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);

module.exports = router;
