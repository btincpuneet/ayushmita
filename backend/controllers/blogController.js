const { Blog } = require('../models/blog');
const fs = require("fs");
const path = require("path");
const createBlog = async (req, res) => {
  try {
    const {
      category_id,
      title,
      slug,
      short_description,
      description_html,
      is_global
    } = req.body;

    if (!title) return res.status(400).json({ success: false, message: "Title is required" });
    if (!slug) return res.status(400).json({ success: false, message: "Slug is required" });
    if (!category_id) return res.status(400).json({ success: false, message: "Category ID is required" });

    let imageUrl = null;

    if (req.file) {
      const imageName = `blog_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads/blogs");

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/blogs/${imageName}`;
    }

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
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    console.error("Get Blog Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    let imageUrl = blog.image;

    if (req.file) {
      const imageName = `blog_${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../uploads/blogs");

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/blogs/${imageName}`;
    }

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

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    await blog.destroy();
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
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
