const express = require("express");
const router = express.Router();
const controller = require("../../controllers/globalSettingController");

router.get("/", controller.get);
router.post("/", controller.create);
router.put("/", controller.update);
router.delete("/", controller.delete);

router.post("/", controller.upsert);

module.exports = router;
