const express = require("express");
const router = express.Router();
const faqController = require("../../controllers/faqController");
const { authenticateToken } = require('../../middleware/authMiddleware');

router.post("/faqs", authenticateToken ,faqController.createFAQ);
router.get("/get-active-faqs", faqController.getAllFAQs);

router.get("/faqs", faqController.getFAQs);
router.get("/faqs/:id", faqController.getFAQ);
router.put("/faqs/:id", authenticateToken , faqController.updateFAQ);
router.delete("/faqs/:id", authenticateToken ,faqController.deleteFAQ);

module.exports = router;
