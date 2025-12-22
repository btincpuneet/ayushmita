const { Blog } = require("../models/blog");
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
      author_name,
      is_global,
      is_featured,
      status,
      meta_title,
      meta_description,
      meta_keywords,
      tags,
      reading_time,
      published_at,
    } = req.body;

    if (!title) return res.status(400).json({ success: false, message: "Title is required" });
    if (!slug) return res.status(400).json({ success: false, message: "Slug is required" });
    if (!category_id) return res.status(400).json({ success: false, message: "Category ID is required" });

    const slugExists = await Blog.findOne({ where: { slug } });
    if (slugExists) {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }

    let imageUrl = null;
    if (req.file) {
      const uploadDir = path.join(__dirname, "../uploads/blogs");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const imageName = `blog_${Date.now()}.jpg`;
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

      author_name: author_name || "Admin",

      is_global: Boolean(is_global),
      is_featured: Boolean(is_featured),

      status: status || "published",

      meta_title,
      meta_description,
      meta_keywords,
      tags,
      reading_time,

      published_at: published_at || new Date(),
    });

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { deleted_at: null },
      order: [["published_at", "DESC"]],
    });

    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    console.error("Get Blogs Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { id: req.params.id, deleted_at: null },
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

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
      const uploadDir = path.join(__dirname, "../uploads/blogs");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const imageName = `blog_${Date.now()}.jpg`;
      const uploadPath = path.join(uploadDir, imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);

      imageUrl = `/uploads/blogs/${imageName}`;
    }

    await blog.update({
      ...req.body,
      image: imageUrl,
      is_global: req.body.is_global !== undefined ? Boolean(req.body.is_global) : blog.is_global,
      is_featured: req.body.is_featured !== undefined ? Boolean(req.body.is_featured) : blog.is_featured,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    await blog.update({ deleted_at: new Date() });

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
