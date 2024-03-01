const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  const { title, content, author, tags, thumbnail, publicId } = req.body;

  try {
    if (!title || !content || !author || !tags || !thumbnail || !publicId) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    let blog = await Blog.create({
      title,
      content,
      author,
      tags,
      thumbnail,
      publicId,
    });
    await blog.save();
    return res.status(201).json({ success: true, message: "Blog Created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { title, content, author, tags, thumbnail } = req.body;
  // const { id } = req.params;
  const id = req.id;
  try {
    if (!title || !content || !author || !tags || !thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    let blog = await Blog.findByIdAndUpdate(id, {
      title,
      content,
      author,
      tags,
      thumbnail,
    });
    await blog.save();
    return res.status(200).json({ success: true, message: "Blog Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find();
    if (!blogs)
      return res
        .status(404)
        .json({ success: false, message: "No blogs found" });
    return res
      .status(200)
      .json({ success: true, message: "All blogs fetched", blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    let blog = await Blog.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    return res
      .status(200)
      .json({ success: true, message: "Blog fetched", blog });
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment, userName, userImage, userId } = req.body;

  try {
    let blog = await Blog.findByIdAndUpdate(id, {
      $push: {
        comments: {
          comment,
          userName,
          userImage,
          userId,
        },
      },
    });
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    await blog.save();
    return res
      .status(200)
      .json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  getAllBlogs,
  getBlogById,
  addComment,
};
