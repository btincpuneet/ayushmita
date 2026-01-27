const express = require("express");
const router = express.Router();

const {
  createFooter,
  getAllFooter,
  getActiveFooter,
  getFooterById,
  updateFooter,
  deleteFooter,
} = require("../../controllers/footerController");


router.post("/", createFooter);
router.get("/", getAllFooter);

router.get("/active/list", getActiveFooter);

router.get("/:id", getFooterById);
router.put("/:id", updateFooter);
router.delete("/:id", deleteFooter);

module.exports = router;
