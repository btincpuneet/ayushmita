const { TopPartnerHospital } = require("../models/topPartnerHospital");
const { Disease } = require("../models/disease");
const fs = require("fs");
const path = require("path");
const { Op, fn, col , where} = require("sequelize");

const uploadDir = path.join(__dirname, "../uploads/hospitals");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const makeSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

const createHospital = async (req, res) => {
  try {
    const {
      specialities,
      name,
      country,
      city,
      address,
      founded_year,
      hospital_beds,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status,
      image_alt,
      image_title,
    } = req.body;

    if (!name || !country || !city || !address) {
      return res.status(400).json({
        success: false,
        message: "Name, country, city & address are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Hospital image is required",
      });
    }

    const fileName = `hospital_${Date.now()}.jpg`;
    fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);

    const hospital = await TopPartnerHospital.create({
      name,
      slug: makeSlug(name),
      country,
      city,
      address,
      founded_year,
      hospital_beds,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status: status || "active",
      image_url: `/uploads/hospitals/${fileName}`,
      image_alt,
      image_title,
    });

    if (specialities) {
      let ids = [];

      if (Array.isArray(specialities)) {
        ids = specialities;
      } else if (typeof specialities === "string") {
        try {
          ids = specialities.startsWith("[")
            ? JSON.parse(specialities)
            : specialities.split(",").map(Number);
        } catch (e) {
          return res.status(400).json({
            success: false,
            message: "Invalid specialities format",
          });
        }
      }

      if (ids.length) {
        await hospital.setSpecialities(ids);
      }
    }

    res.status(201).json({
      success: true,
      data: hospital,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// const getHospitalsByCity = async (req, res) => {
//   try {
//     const { city } = req.params;
//     const { country } = req.query;

//     console.log("CITY:", city);
//     console.log("COUNTRY:", country);

//     const hospitals = await TopPartnerHospital.findAll({
//       where: {
//         city: city,
//         country: country,
//       },
//     });

//     res.json({
//       success: true,
//       count: hospitals.length,
//       data: hospitals,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getHospitalBySlug = async (req, res) => {
  try {
    const slug = req.params.slug?.trim();

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Slug is required",
      });
    }

    const hospital = await TopPartnerHospital.findOne({
      where: {
        slug: slug,
        status: "active",
      },
      include: [
        {
          model: Disease,
          as: "specialities",
          attributes: ["id", "name", "slug"],
          through: { attributes: [] },
        },
      ],
    });

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found or inactive",
      });
    }

    res.json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    console.error("Get hospital by slug error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// const getHospitalsByCity = async (req, res) => {
//   try {
//     const { city } = req.params;
//     const { country } = req.query;

//     let hospitals = [];

//     if (city && country) {

//       hospitals = await TopPartnerHospital.findAll({
//         where: {
//           city: { [Op.iLike]: city.trim() },
//           country: { [Op.iLike]: country.trim() },
//         },
//       });

//     }

//     if (!hospitals || hospitals.length === 0) {
//       hospitals = await TopPartnerHospital.findAll();
//     }


//     res.status(200).json({
//       success: true,
//       count: hospitals.length,
//       data: hospitals,
//     });
//   } catch (error) {
//     console.error("getHospitalsByCity error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const getHospitalsByCity = async (req, res) => {
  try {
    const city = decodeURIComponent(req.params.city || "")
      .replace(/\s+/g, "")
      .toLowerCase();

    const country = decodeURIComponent(req.query.country || "")
      .trim()
      .toLowerCase();

    let hospitals = [];

    // ✅ Step 1: Get matched hospitals
    if (city && country) {
      hospitals = await TopPartnerHospital.findAll({
        where: {
          [Op.and]: [
            where(
              fn("REPLACE", fn("LOWER", col("city")), " ", ""),
              city
            ),
            where(
              fn("LOWER", col("country")),
              country
            )
          ]
        }
      });
    }

    // ✅ Step 2: If NO match → show ALL
    if (!hospitals || hospitals.length === 0) {
      hospitals = await TopPartnerHospital.findAll();
    }

    res.status(200).json({
      success: true,
      count: hospitals.length,
      data: hospitals,
    });
  } catch (error) {
    console.error("getHospitalsByCity error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getActiveHospitals = async (req, res) => {
  try {
    const hospitals = await TopPartnerHospital.findAll({
      where: { status: "active" },
      order: [["id", "DESC"]],
      include: [
        {
          model: Disease,
          as: "specialities",
          attributes: ["id", "name", "slug"],
          through: { attributes: [] },
        },
      ],
    });

    res.json({ success: true, data: hospitals });
  } catch (err) {
    console.error("Get active hospitals error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await TopPartnerHospital.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Disease,
          as: "specialities",
          through: { attributes: [] },
        },
      ],
    });


    res.json({ success: true, data: hospitals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);
    if (!hospital)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: hospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateHospital = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);
    if (!hospital)
      return res.status(404).json({ success: false, message: "Not found" });

    let imagePath = hospital.image_url;

    if (req.file) {
      const fileName = `hospital_${Date.now()}.jpg`;
      fs.writeFileSync(
        path.join(uploadDir, fileName),
        req.file.buffer
      );
      imagePath = `/uploads/hospitals/${fileName}`;
    }

    const updateData = {
      ...req.body,
      image_url: imagePath,
      image_alt: req.body.image_alt,
      image_title: req.body.image_title,
    };


    if (req.body.name) {
      updateData.slug = makeSlug(req.body.name);
    }

    await hospital.update(updateData);
    if (req.body.specialities) {
      let ids = [];

      if (Array.isArray(req.body.specialities)) {
        ids = req.body.specialities;
      } else if (typeof req.body.specialities === "string") {
        ids = req.body.specialities.startsWith("[")
          ? JSON.parse(req.body.specialities)
          : req.body.specialities.split(",").map(Number);
      }

      await hospital.setSpecialities(ids);
    }

    res.json({ success: true, message: "Updated", data: hospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const hospital = await TopPartnerHospital.findByPk(req.params.id);
    if (!hospital)
      return res.status(404).json({ success: false, message: "Not found" });

    await hospital.destroy();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
  getHospitalBySlug,
  getActiveHospitals,
  getHospitalsByCity

};
