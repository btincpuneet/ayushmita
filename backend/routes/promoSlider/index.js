const express = require('express');
const multer = require('multer');
const fs = require("fs");
const path = require("path");
const {
  createPromoSlider,
  getPromoSliders,
  getPromoSliderById,
  updatePromoSlider,
  deletePromoSlider
} = require('../../controllers/promoSliderController');

const router = express.Router();

// Store file in memory so we get binary data
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  }
});

router.post('/promo-sliders', upload.single('image'), createPromoSlider);
router.get('/promo-sliders', getPromoSliders);
router.get('/promo-sliders/:id', getPromoSliderById);
router.put('/promo-sliders/:id', upload.single('image'), updatePromoSlider);
router.delete('/promo-sliders/:id', deletePromoSlider);

module.exports = router;
