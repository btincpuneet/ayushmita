const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const heroController = require("../../controllers/heroBannerController");

// ==========================
// Ensure Upload Directory Exists
// ==========================
const uploadPath = "uploads/hero-banners/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📁 Created folder:", uploadPath);
}

// ==========================
// Multer Config
// ==========================
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

// ==========================
// HERO BANNER ROUTES
// ==========================

// CREATE Hero Banner (uses multer)
router.post(
  "/hero-banners",
  upload.single("image"),
  heroController.createHeroBanner
);

// GET all Hero Banners
router.get("/hero-banners", heroController.getAllHeroBanners);

// GET single Hero Banner by ID
router.get("/hero-banners/:id", heroController.getHeroBannerById);

// UPDATE Hero Banner (with optional new image)
router.put(
  "/hero-banners/:id",
  upload.single("image"),
  heroController.updateHeroBanner
);

// DELETE Hero Banner
router.delete("/hero-banners/:id", heroController.deleteHeroBanner);

module.exports = router;
