const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
  },
  likes: {
    type: Number,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
