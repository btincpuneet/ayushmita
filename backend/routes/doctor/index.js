const router = require("express").Router();
const doctorController = require("../../controllers/doctorController");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  }
});

// ROUTES
router.post("/doctors", upload.single("image"), doctorController.createDoctor);

router.get("/doctors", doctorController.getDoctors);  

router.get("/doctors/:id", doctorController.getDoctorById);

router.put("/doctors/:id", upload.single("image"), doctorController.updateDoctor);

router.delete("/doctors/:id", doctorController.deleteDoctor);

module.exports = router;
