const express = require("express");
const router = express.Router();

const {
  createContactUs,
  getAllContactUs,
  getActiveContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs,
} = require("../../controllers/contactUsController");

router.post("/", createContactUs);
router.get("/", getAllContactUs);

router.get("/active/list", getActiveContactUs);

router.get("/:id", getContactUsById);
router.put("/:id", updateContactUs);
router.delete("/:id", deleteContactUs);

module.exports = router;
