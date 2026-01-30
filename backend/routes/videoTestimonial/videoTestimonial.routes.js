const express = require("express");
const router = express.Router();

const {
  createVideoTestimonial,
  getAllVideoTestimonials,
  getVideoTestimonialBySlug,
  updateVideoTestimonial,
  deleteVideoTestimonial,
  getActiveVideoTestimonials,
} = require("../../controllers/videoTestimonial.controller.js");

router.post("/video-testimonials/", createVideoTestimonial);
router.get("/video-testimonials/", getAllVideoTestimonials);
router.get("/video-testimonials/active", getActiveVideoTestimonials);
router.get("/video-testimonials/:slug", getVideoTestimonialBySlug);
router.put("/video-testimonials/:id", updateVideoTestimonial);
router.delete("/video-testimonials/:id", deleteVideoTestimonial); 
module.exports = router;
