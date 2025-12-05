const express = require("express");
const router = express.Router();

const {
  createDisease,
  getAllDiseases,
  getDiseaseWithTreatments,
  updateDisease,
  deleteDisease,
} = require("../../controllers/diseaseController");

const { uploadDisease } = require("../../middleware/upload");

// CREATE Disease
router.post("/disease", uploadDisease.single("image"), createDisease);

// GET All Diseases
router.get("/", getAllDiseases);

// GET Disease + All Treatments (slug based)
router.get("/:slug", getDiseaseWithTreatments);

// UPDATE Disease
router.put("/:id", uploadDisease.single("image"), updateDisease);

// DELETE DISEASE
router.delete("/:id", deleteDisease);

module.exports = router;
