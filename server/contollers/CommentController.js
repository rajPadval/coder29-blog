const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const getComment = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog by its ID and populate the comments field
    let blog = await Blog.findById(id).populate("comments");
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments: blog.comments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment, userName, userImage, userId } = req.body;

  try {
    let blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    let newComment = await Comment.create({
      comment,
      userName,
      userImage,
      userId,
      postId: id,
    });
    // Add the new comment to the blog's comments array
    blog.comments.push(newComment);
    await blog.save();
    return res
      .status(200)
      .json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { comment } = req.body;

  try {
    let commentToUpdate = await Comment.findById(commentId);
    console.log(blogId, commentId);
    if (!commentToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    // Check if the comment belongs to the specified blog
    if (commentToUpdate.postId.toString() !== blogId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment for this blog" });
    }
    commentToUpdate.comment = comment;

    await commentToUpdate.save();
    return res
      .status(200)
      .json({ success: true, message: "Comment updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;

  try {
    // Find the comment to delete
    let commentToDelete = await Comment.findById(commentId);
    if (!commentToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    // Check if the comment belongs to the specified blog
    if (commentToDelete.postId.toString() !== blogId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment for this blog" });
    }

    // Find the blog and remove the comment from its comments array
    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Pull the comment ID from the comments array
    blog.comments.pull(commentId);

    // Save the updated blog
    await blog.save();

    // Delete the comment document
    await commentToDelete.deleteOne(); // Use deleteOne method instead of remove

    return res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  getComment,
};
