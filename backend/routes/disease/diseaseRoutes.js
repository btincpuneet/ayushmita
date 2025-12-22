const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  createDisease,
  getAllDiseases,
  getDiseaseWithTreatments,
  getDiseaseById,
  updateDisease,
  deleteDisease,
  getAllDiseasesWithTreatments,
} = require("../../controllers/diseaseController");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/"))
      return cb(new Error("Only images allowed"), false);
    cb(null, true);
  }
});

router.post("/", upload.single("image"), createDisease);

router.get("/", getAllDiseasesWithTreatments);
router.get("/:slug", getDiseaseWithTreatments);
router.get("/:id", getDiseaseById);

router.put("/:id", upload.single("image"), updateDisease);
router.delete("/:id", deleteDisease);

module.exports = router;
