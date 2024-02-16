import Blog from "../models/Blog";

const createBlog = async (req, res) => {
  const { title, content, author, tags, thumbnail } = req.body;

  try {
    if (!title || !content || !author || !tags || !thumbnail) {
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
    });
    await blog.save();
    return res.status(201).json({ success: true, message: "Blog Created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { title, content, author, tags, thumbnail } = req.body;
  const { id } = req.params;
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
