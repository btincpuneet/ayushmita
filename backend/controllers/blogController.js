const fs = require("fs");
const path = require("path");
const { Blog } = require("../models/blog");


exports.createBlog = async (req, res) => {
  try {
    let imageUrl = null;

    // ✅ IMAGE HANDLING
    if (req.file) {
      const imageName = `blog_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/${imageName}`;
    }

    const isGlobal = ["1", 1, true, "true"].includes(req.body.is_global);
    const isFeatured = ["1", 1, true, "true"].includes(req.body.is_featured);

    const blog = await Blog.create({
      category_id,
      title,
      slug,
      image: imageUrl,
      short_description,
      description_html,
      is_global: is_global || 1
    });

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [["id", "DESC"]] });
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    console.error("Get Blogs Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    let imageUrl = blog.blog_image;

    // ✅ IMAGE UPDATE
    if (req.file) {
      const imageName = `blog_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/${imageName}`;
    }

    const isGlobal = ["1", 1, true, "true"].includes(req.body.is_global);
    const isFeatured = ["1", 1, true, "true"].includes(req.body.is_featured);

    await blog.update({
      ...req.body,
      image: imageUrl,
    });

    res.status(200).json({ success: true, message: "Blog updated successfully", data: blog });
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ success: false, message: err.message });
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
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    await blog.update({
      deleted_at: new Date(),
    });

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
