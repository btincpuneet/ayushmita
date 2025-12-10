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
router.get("/single/:slug", getTreatmentBySlug);
router.get("/disease/:diseaseId", getTreatmentsByDisease);
router.put("/:id", uploadTreatment.single("image"), updateTreatment);
router.delete("/:id", deleteTreatment);

module.exports = router;
