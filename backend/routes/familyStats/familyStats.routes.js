const express = require("express");
const router = express.Router();
const familyStatsController = require("../../controllers/familyStatsController");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

router.post(
  "/",
  upload.single("icon"),
  familyStatsController.create
);

router.put(
  "/:id",
  upload.single("icon"),
  familyStatsController.update
);

router.get("/", familyStatsController.getAll);
router.get("/:id", familyStatsController.getOne);
router.delete("/:id", familyStatsController.delete);

module.exports = router;
