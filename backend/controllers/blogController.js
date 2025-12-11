const { Blog } = require('../models/blog');

exports.createBlog = async (req, res) => {
  try {
   
    const {
      category_id,
      title,
      slug,
      image,
      short_description,
      description_html,
      is_global
    } = req.body;

    const newBlog = await Blog.create({
      category_id,
      title,
      slug,
      image,
      short_description,
      description_html,
      is_global
    });

    res.status(201).json({
      message: 'Blog created successfully',
      blog: newBlog
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.update(req.body);

    res.status(200).json({
      message: 'Blog updated successfully',
      blog
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.destroy();

    res.status(200).json({ message: 'Blog deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
      }
};
