const express = require("express");
const router = express.Router();

const {
  handleForm,
} = require("../../controllers/formController");

router.post("/api/form-submit", handleForm);

module.exports = router;
