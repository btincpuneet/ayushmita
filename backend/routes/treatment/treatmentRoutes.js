const express = require("express");
const router = express.Router();
const { authenticateToken } = require('../../middleware/authMiddleware');

const {
  createTreatment,
  getTreatmentBySlug,
  getTreatmentsByDisease,
  updateTreatment,
  deleteTreatment,
} = require("../../controllers/treatmentController");

const { uploadTreatment } = require("../../middleware/upload");

router.post("/", uploadTreatment.single("image"),authenticateToken, createTreatment);
router.get("/single/:slug", getTreatmentBySlug);
router.get("/disease/:diseaseId", getTreatmentsByDisease);
router.put("/:id", uploadTreatment.single("image"), authenticateToken ,updateTreatment);
router.delete("/:id", authenticateToken , deleteTreatment);

module.exports = router;
