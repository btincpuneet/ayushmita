const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
} = require("../../controllers/topPartnerHospitalController");

// Multer Setup
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
});

// CREATE
router.post("/hospitals", upload.single("image"), createHospital);

// GET ALL
router.get("/hospitals", getAllHospitals);

// GET BY ID
router.get("/hospitals/:id", getHospitalById);

// UPDATE
router.put("/hospitals/:id", upload.single("image"), updateHospital);

// DELETE
router.delete("/hospitals/:id", deleteHospital);

module.exports = router;
