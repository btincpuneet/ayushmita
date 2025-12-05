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
  }
});

// ===============================
// BASE ROUTE (from server.js): /api
// Final endpoint becomes: /api/hospitals
// ===============================

// CREATE hospital
router.post("/hospitals", upload.single("image"), createHospital);

// GET all hospitals
router.get("/hospitals", getAllHospitals);

// GET hospital by id
router.get("/hospitals/:id", getHospitalById);

// UPDATE hospital
router.put("/hospitals/:id", upload.single("image"), updateHospital);

// DELETE hospital
router.delete("/hospitals/:id", deleteHospital);

module.exports = router;
