const express = require("express");
const router = express.Router();
const controller = require("../../controllers/buttonAppointmentController");
const { authenticateToken } = require('../../middleware/authMiddleware');

router.post("/", authenticateToken, controller.createButton);
router.get("/", controller.getAllButtons);
router.get("/:id", controller.getButtonById);
router.put("/:id", authenticateToken, controller.updateButton);
router.delete("/:id", authenticateToken, controller.deleteButton);

module.exports = router;
