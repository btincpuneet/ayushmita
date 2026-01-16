const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
  getHospitalBySlug,
  getActiveHospitals,
} = require("../../controllers/topPartnerHospitalController");
const { authenticateToken } = require('../../middleware/authMiddleware');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
});

router.post("/hospitals", upload.single("image"), authenticateToken ,createHospital);
router.get("/hospitals/active", getActiveHospitals);

router.get("/hospitals", getAllHospitals);
router.get("/hospitals/:slug", getHospitalBySlug);
router.get("/hospitals/:id", getHospitalById);
router.put("/hospitals/:id", upload.single("image"),authenticateToken , updateHospital);
router.delete("/hospitals/:id", authenticateToken ,deleteHospital);

module.exports = router;
