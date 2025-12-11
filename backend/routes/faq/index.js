const express = require("express");
const router = express.Router();
const faqController = require("../../controllers/faqController");

// CRUD Routes
router.post("/faqs", faqController.createFAQ);
router.get("/faqs", faqController.getFAQs);
router.get("/faqs/:id", faqController.getFAQ);
router.put("/faqs/:id", faqController.updateFAQ);
router.delete("/faqs/:id", faqController.deleteFAQ);

module.exports = router;
