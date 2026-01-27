const fs = require("fs");
const path = require("path");
const { Blog } = require("../models/blog");
const { Disease } = require("../models/disease");
const { Treatment } = require("../models/treatment");


exports.createBlog = async (req, res) => {
  try {
    const { title, slug } = req.body;

    // 🔒 Validate required fields
    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required",
      });
    }

    // ❌ Prevent duplicate TITLE
    const existingTitle = await Blog.findOne({
      where: { title },
    });

    if (existingTitle) {
      return res.status(409).json({
        success: false,
        message: "Blog with this title already exists",
      });
    }

    // ❌ Prevent duplicate SLUG
    const existingSlug = await Blog.findOne({
      where: { slug },
    });

    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message: "Blog with this slug already exists",
      });
    }

    // 📸 Image upload
    let imageUrl = null;

    if (req.file) {
      const imageName = `blog_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(uploadDir, imageName),
        req.file.buffer
      );

      imageUrl = `/uploads/${imageName}`;
    }

    const isGlobal = ["1", 1, true, "true"].includes(req.body.is_global);

    let diseaseName = null;
    let treatmentName = null;

    if (!isGlobal && req.body.disease_id) {
      const disease = await Disease.findByPk(req.body.disease_id);
      diseaseName = disease?.name || null;
    }

    if (!isGlobal && req.body.treatment_id && req.body.treatment_id !== "0") {
      const treatment = await Treatment.findByPk(req.body.treatment_id);
      treatmentName = treatment?.name || null;
    }

    // ✅ CREATE BLOG
    const blog = await Blog.create({
      title,
      slug,
      short_description: req.body.short_description,
      description_html: req.body.description_html,

      blog_image: imageUrl,
      blog_image_alt: req.body.blog_image_alt || title,
      blog_image_title: req.body.blog_image_title || title,

      author_name: req.body.author_name || "Admin",

      is_global: isGlobal,
      is_featured: ["1", 1, true, "true"].includes(req.body.is_featured),

      disease_id: isGlobal ? null : req.body.disease_id,
      disease_name: diseaseName,

      treatment_id:
        isGlobal || req.body.treatment_id === "0"
          ? null
          : req.body.treatment_id,

      treatment_name:
        isGlobal || req.body.treatment_id === "0"
          ? null
          : treatmentName,

      canonical_url: req.body.canonical_url,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
      tags: req.body.tags,

      status: req.body.status || "published",
      published_at: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });

  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, slug } = req.body;

    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ❌ Prevent duplicate TITLE (ignore same blog)
    if (title) {
      const titleExists = await Blog.findOne({
        where: {
          title,
          id: { [require("sequelize").Op.ne]: blog.id },
        },
      });

      if (titleExists) {
        return res.status(409).json({
          success: false,
          message: "Another blog with this title already exists",
        });
      }
    }

    // ❌ Prevent duplicate SLUG (ignore same blog)
    if (slug) {
      const slugExists = await Blog.findOne({
        where: {
          slug,
          id: { [require("sequelize").Op.ne]: blog.id },
        },
      });

      if (slugExists) {
        return res.status(409).json({
          success: false,
          message: "Another blog with this slug already exists",
        });
      }
    }

    // 📸 Image upload
    let imageUrl = blog.blog_image;

    if (req.file) {
      const imageName = `blog_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(uploadDir, imageName),
        req.file.buffer
      );

      imageUrl = `/uploads/${imageName}`;
    }

    const isGlobal = ["1", 1, true, "true"].includes(req.body.is_global);

    let diseaseName = null;
    let treatmentName = null;

    if (!isGlobal && req.body.disease_id) {
      const disease = await Disease.findByPk(req.body.disease_id);
      diseaseName = disease?.name || null;
    }

    if (!isGlobal && req.body.treatment_id && req.body.treatment_id !== "0") {
      const treatment = await Treatment.findByPk(req.body.treatment_id);
      treatmentName = treatment?.name || null;
    }

    // ✅ UPDATE BLOG
    await blog.update({
      title,
      slug,
      short_description: req.body.short_description,
      description_html: req.body.description_html,

      blog_image: imageUrl,
      blog_image_alt: req.body.blog_image_alt || title,
      blog_image_title: req.body.blog_image_title || title,

      author_name: req.body.author_name || "Admin",

      is_global: isGlobal,
      is_featured: ["1", 1, true, "true"].includes(req.body.is_featured),

      disease_id: isGlobal ? null : req.body.disease_id,
      disease_name: diseaseName,

      treatment_id: isGlobal ? null : req.body.treatment_id,
      treatment_name: treatmentName,

      canonical_url: req.body.canonical_url,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
      tags: req.body.tags,

      status: req.body.status,
    });

    return res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });

  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.getAllBlogs = async (_req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { deleted_at: null },
      order: [["published_at", "DESC"]],
    });

    res.json({ success: true, data: blogs });
  } catch (err) {
    console.error("Get All Blogs Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: {
        id: req.params.id,
        deleted_at: null,
      },
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, data: blog });
  } catch (err) {
    console.error("Get Blog By ID Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.blog_image) {
      const imagePath = path.join(
        __dirname,
        "..",
        blog.blog_image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }


    await blog.destroy();

    res.json({
      success: true,
      message: "Blog deleted permanently",
    });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Slug is required",
      });
    }

    const blog = await Blog.findOne({
      where: {
        slug: slug.trim(),
        status: "published",
        deleted_at: null,
      },
      raw: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("getBlogBySlug error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.getRecentBlogs = async (req, res) => {
  try {
    const { diseaseId, treatmentId } = req.query;

    if (!diseaseId) {
      return res.status(400).json({
        success: false,
        message: "diseaseId is required",
      });
    }

    const whereCondition = {
      status: "published",
      deleted_at: null,
      disease_id: Number(diseaseId),
    };

    if (treatmentId && Number(treatmentId) !== 0) {
      whereCondition.treatment_id = Number(treatmentId);
    }

    const blogs = await Blog.findAll({
      where: whereCondition,
      order: [["published_at", "DESC"]],
      limit: 5,
    });

    res.status(200).json({
      success: true,
      data: blogs,
    });

  } catch (error) {
    console.error("getRecentBlogs ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
