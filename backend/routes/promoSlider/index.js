const express = require('express');
const multer = require('multer');


const {
  createPromoSlider,
  getPromoSliders,
  getPromoSliderById,
  updatePromoSlider,
  deletePromoSlider
} = require('../../controllers/promoSliderController');

const { authenticateToken } = require('../../middleware/authMiddleware');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  }
});

router.get('/promo-sliders', getPromoSliders);
router.get('/promo-sliders/:id', getPromoSliderById);

router.post(
  '/promo-sliders',
  authenticateToken,
  upload.single('image'),
  createPromoSlider
);

router.put(
  '/promo-sliders/:id',
  authenticateToken,
  upload.single('image'),
  updatePromoSlider
);

router.delete(
  '/promo-sliders/:id',
  authenticateToken,
  deletePromoSlider
);

module.exports = router;
