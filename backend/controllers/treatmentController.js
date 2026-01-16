const { Treatment } = require("../models/treatment");
const { Disease } = require("../models/disease");


const { Op } = require("sequelize");


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
      status,
    } = req.body;

    /* ===============================
       Required Fields Validation
    ================================ */
    if (!disease_id)
      return res.status(400).json({ success: false, message: "Disease is required" });

    if (!name || !name.trim())
      return res.status(400).json({ success: false, message: "Treatment name is required" });

    if (!slug || !slug.trim())
      return res.status(400).json({ success: false, message: "Slug is required" });

    if (!short_description)
      return res.status(400).json({ success: false, message: "Short description is required" });

    if (!description_html)
      return res.status(400).json({ success: false, message: "Description is required" });

    if (!seo_title)
      return res.status(400).json({ success: false, message: "SEO title is required" });

    if (!seo_description)
      return res.status(400).json({ success: false, message: "SEO description is required" });

    if (!seo_keywords)
      return res.status(400).json({ success: false, message: "SEO keywords are required" });

    if (!canonical_url)
      return res.status(400).json({ success: false, message: "Canonical URL is required" });




    const disease = await Disease.findByPk(disease_id);
    if (!disease) {
      return res.status(404).json({
        success: false,
        message: "Selected disease does not exist",
      });
    }


    const existingSlug = await Treatment.findOne({ where: { slug } });
    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message: "Treatment with this slug already exists",
      });
    }


    const image = req.file ? `/uploads/treatments/${req.file.filename}` : null;


    const treatment = await Treatment.create({
      disease_id: Number(disease_id),
      name: name.trim(),
      slug: slug.trim(),
      image,
      short_description,
      description_html,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      status: Number(status),
    });

    return res.status(201).json({
      success: true,
      message: "Treatment created successfully",
      data: treatment,
    });
  } catch (error) {
    console.error("Create Treatment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
      return res.status(404).json({
        success: false,
        message: "Treatment not found",
      });
    }

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
      status,
    } = req.body;

   
    if (disease_id !== undefined) {
      const disease = await Disease.findByPk(disease_id);
      if (!disease) {
        return res.status(404).json({
          success: false,
          message: "Selected disease does not exist",
        });
      }
      treatment.disease_id = disease_id;
    }

  
    if (slug !== undefined) {
      if (!slug.trim()) {
        return res.status(400).json({
          success: false,
          message: "Slug cannot be empty",
        });
      }

      const existingSlug = await Treatment.findOne({
        where: {
          slug,
          id: { [Op.ne]: id },
        },
      });

      if (existingSlug) {
        return res.status(409).json({
          success: false,
          message: "Treatment with this slug already exists",
        });
      }

      treatment.slug = slug.trim();
    }

    if (status !== undefined) {
      if (![0, 1, "0", "1"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be 0 or 1",
        });
      }
      treatment.status = Number(status);
    }

    if (name !== undefined) treatment.name = name.trim();
    if (short_description !== undefined) treatment.short_description = short_description;
    if (description_html !== undefined) treatment.description_html = description_html;
    if (seo_title !== undefined) treatment.seo_title = seo_title;
    if (seo_description !== undefined) treatment.seo_description = seo_description;
    if (seo_keywords !== undefined) treatment.seo_keywords = seo_keywords;
    if (canonical_url !== undefined) treatment.canonical_url = canonical_url;

    if (req.file) {
      treatment.image = `/uploads/treatments/${req.file.filename}`;
    }

    await treatment.save();

    return res.json({
      success: true,
      message: "Treatment updated successfully",
      data: treatment,
    });
  } catch (error) {
    console.error("Update Treatment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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
