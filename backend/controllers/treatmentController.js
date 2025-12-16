const { Treatment } = require("../models/treatment");
const { Disease } = require("../models/disease");


const createTreatment = async (req, res) => {
  try {
    const {
      disease_id,
      name,
      slug,
      short_description,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status
    } = req.body;

    
    const requiredFields = {
      disease_id,
      name,
      slug,
      short_description,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status
    };

    for (const field in requiredFields) {
      if (!requiredFields[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    
    const image = req.file ? `/uploads/treatments/${req.file.filename}` : null;

   
    const treatment = await Treatment.create({
      disease_id: Number(disease_id),
      name,
      slug,
      image,
      short_description,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status: Number(status)
    });

    return res.json({
      success: true,
      message: "Treatment created successfully",
      treatment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getTreatmentBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const treatment = await Treatment.findOne({
      where: { slug, status: 1 },
      include: [
        {
          model: Disease,
          as: "disease",
        },
      ],
    });

    if (!treatment) {
      return res
        .status(404)
        .json({ success: false, message: "Not found" });
    }

    return res.json({ success: true, treatment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTreatmentsByDisease = async (req, res) => {
  try {
    const { diseaseId } = req.params;

    const treatments = await Treatment.findAll({
      where: { disease_id: diseaseId, status: 1 },
      order: [["id", "DESC"]],
    });

    return res.json({ success: true, treatments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTreatment = async (req, res) => {
  try {
    const { id } = req.params;

    const treatment = await Treatment.findByPk(id);
    if (!treatment) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const data = req.body;

    if (req.file) {
      data.image = `/uploads/treatments/${req.file.filename}`;
    } else {
      delete data.image; 
    }

    await treatment.update(data);

    return res.json({ success: true, treatment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



const deleteTreatment = async (req, res) => {
  try {
    const { id } = req.params;

    const treatment = await Treatment.findByPk(id);
    if (!treatment)
      return res.status(404).json({ success: false, message: "Not found" });

    await treatment.destroy();

    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  createTreatment,
  getTreatmentBySlug,
  getTreatmentsByDisease,
  updateTreatment,
  deleteTreatment,
};
