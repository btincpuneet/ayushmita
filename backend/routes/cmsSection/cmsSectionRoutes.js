const express = require("express");
const router = express.Router();

const {
  createSection,
  updateSection,
  getAllSections,
  getSectionBySlug,
  deleteSection,
} = require("../../controllers/cmsSectionController.js");

// ADMIN
router.post("/", createSection);
router.put("/:id", updateSection);
router.get("/", getAllSections);
router.delete("/:id", deleteSection);

// PUBLIC
router.get("/:slug", getSectionBySlug);

module.exports = router;
