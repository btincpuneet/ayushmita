const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const heroController = require("../../controllers/heroBannerController");
const { authenticateToken } = require('../../middleware/authMiddleware');


const uploadPath = "uploads/hero-banners/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📁 Created folder:", uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


router.post(
  "/hero-banners",
  upload.single("image"),
  authenticateToken,
  heroController.createHeroBanner
);


router.get("/hero-banners", heroController.getAllHeroBanners);

router.get("/hero-banners/:id", heroController.getHeroBannerById);

router.put(
  "/hero-banners/:id",
  upload.single("image"),
  
  heroController.updateHeroBanner
);
router.get(
  "/hero-active-banners",
  heroController.getActiveHeroBanners
);

router.delete("/hero-banners/:id", authenticateToken ,heroController.deleteHeroBanner);

module.exports = router;
