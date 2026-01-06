const { CountryCity } = require("../models/CountryCity");

exports.getCountries = async (req, res) => {
  try {
    const countries = await CountryCity.findAll({
      attributes: ["country", "country_code"],
      group: ["country", "country_code"],
      order: [["country", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      data: countries,
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch countries",
    });
  }
};

exports.getCitiesByCountry = async (req, res) => {
  const { country } = req.query;

  if (!country) {
    return res.status(400).json({
      success: false,
      message: "Country is required",
    });
  }

  try {
    const cities = await CountryCity.findAll({
      where: { country },
      attributes: ["city"],
      order: [["city", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cities",
    });
  }
};
