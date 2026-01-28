const express = require("express");
const router = express.Router();
const faqController = require("../../controllers/faqController");
const { authenticateToken } = require('../../middleware/authMiddleware');

router.post("/faqs", authenticateToken ,faqController.createFAQ);
router.get("/get-active-faqs", faqController.getAllFAQs);

router.get("/active/faqs", faqController.getActiveFAQs);
router.get("/faqs/:id", faqController.getFAQ);
router.put("/faqs/:id", authenticateToken , faqController.updateFAQ);
router.delete("/faqs/:id", authenticateToken ,faqController.deleteFAQ);

router.get("/faqs/hospitals/dropdown", faqController.getHospitalDropdown);
router.get("/faqs/doctors/dropdown", faqController.getDoctorDropdown);

module.exports = router;
