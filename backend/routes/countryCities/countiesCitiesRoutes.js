const express = require("express");
const router = express.Router();
const countiesCities = require("../../controllers/countiesCities");

router.get("/countries", countiesCities.getCountries);
router.get("/cities", countiesCities.getCitiesByCountry);

module.exports = router;
