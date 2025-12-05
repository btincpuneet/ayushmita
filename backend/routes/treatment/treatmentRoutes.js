const express = require("express");
const router = express.Router();

const {
  createTreatment,
  getTreatmentBySlug,
  getTreatmentsByDisease,
  updateTreatment,
  deleteTreatment,
} = require("../../controllers/treatmentController");

const { uploadTreatment } = require("../../middleware/upload");

router.post("/", uploadTreatment.single("image"), createTreatment);

// GET Treatment By Slug
router.get("/single/:slug", getTreatmentBySlug);

// GET All Treatments of a Disease
router.get("/disease/:diseaseId", getTreatmentsByDisease);

// UPDATE Treatment
router.put("/:id", uploadTreatment.single("image"), updateTreatment);

// DELETE Treatment
router.delete("/:id", deleteTreatment);

module.exports = router;
