const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createDoctor,
  getDoctors,
  getDoctorBySlug,
  updateDoctor,
  deleteDoctor,
  getActiveDoctors,
  getSimilarDoctors,
  getDoctorsBySpeciality,
} = require("../../controllers/doctorController");


const upload = multer({ storage: multer.memoryStorage() });

router.post("/doctors", upload.single("image"), createDoctor);
router.get("/doctors/similar/:slug", getSimilarDoctors);
router.get("/doctors/by-speciality/:specialityId", getDoctorsBySpeciality);

router.get("/doctors/active", getActiveDoctors)
router.get("/doctors", getDoctors);
router.get("/doctors/:slug", getDoctorBySlug);

router.put("/doctors/:id", upload.single("image"), updateDoctor);
router.delete("/doctors/:id", deleteDoctor);

module.exports = router;
