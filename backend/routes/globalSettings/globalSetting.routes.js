const express = require("express");
const router = express.Router();
const controller = require("../../controllers/globalSettingController");
const { authenticateToken } = require('../../middleware/authMiddleware');

router.get("/", controller.get);
router.post("/", controller.create);
router.put("/", authenticateToken, controller.update);
router.delete("/", authenticateToken, controller.delete);

router.post("/", authenticateToken, controller.upsert);

module.exports = router;
