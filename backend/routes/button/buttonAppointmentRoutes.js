const express = require("express");
const router = express.Router();
const controller = require("../../controllers/buttonAppointmentController");

router.post("/", controller.createButton);
router.get("/", controller.getAllButtons);
router.get("/:id", controller.getButtonById);
router.put("/:id", controller.updateButton);
router.delete("/:id", controller.deleteButton);

module.exports = router;
    