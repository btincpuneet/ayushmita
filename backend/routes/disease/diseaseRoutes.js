const express = require("express");
const multer = require("multer");
const { authenticateToken } = require('../../middleware/authMiddleware');

const router = express.Router();

const {
  createDisease,
  getDiseaseWithTreatments,
  getDiseaseById,
  updateDisease,
  deleteDisease,
  getAllDiseasesWithTreatments,
  getAllDiseases,
} = require("../../controllers/diseaseController");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/"))
      return cb(new Error("Only images allowed"), false);
    cb(null, true);
  }
});
router.get("/get-active-disease", getAllDiseases);

router.get("/", getAllDiseasesWithTreatments);

router.get("/:slug", getDiseaseWithTreatments);

router.get("/id/:id", getDiseaseById);

router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  createDisease
);

router.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  updateDisease
);

router.delete(
  "/:id",
  authenticateToken,
  deleteDisease
);

module.exports = router;
