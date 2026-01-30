const express = require("express");
const multer = require("multer");

const {
  createNewsEvent,
  getActiveNewsEvents,
  getNewsEventBySlug,
  updateNewsEvent,
  deleteNewsEvent,
  getAllNewsEvents,
} = require("../../controllers/newsEventController");

const { authenticateToken } = require("../../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  },
});
router.get(
  "/news-events/active",
  getAllNewsEvents
);
router.get("/news-events", getActiveNewsEvents); 
router.get("/news-events/:slug", getNewsEventBySlug);

router.post(
  "/news-events",
  authenticateToken,
  upload.single("image"),
  createNewsEvent
);

router.put(
  "/news-events/:id",
  authenticateToken,
  upload.single("image"),
  updateNewsEvent
);

router.delete(
  "/news-events/:id",
  authenticateToken,
  deleteNewsEvent
);

module.exports = router;
