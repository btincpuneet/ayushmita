const express = require("express");
const router = express.Router();
const { authenticateToken } = require('../../middleware/authMiddleware');

const {
  createContactUs,
  getAllContactUs,
  getActiveContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs,
} = require("../../controllers/contactUsController");

router.post("/", authenticateToken ,createContactUs);
router.get("/", getAllContactUs);

router.get("/active/list", getActiveContactUs);

router.get("/:id", getContactUsById);
router.put("/:id", authenticateToken , updateContactUs);
router.delete("/:id", authenticateToken ,deleteContactUs);

module.exports = router;
