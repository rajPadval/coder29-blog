const {
  signup,
  login,
  logout,
  checkAuth,
} = require("./contollers/AuthController");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} = require("./contollers/BlogController");
const {
  updateComment,
  deleteComment,
  addComment,
  getComment,
} = require("./contollers/CommentController");
const verifyToken = require("./middlewares/verifyToken");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", verifyToken, checkAuth);

router.post("/createBlog", verifyToken, createBlog);
router.get("/allBlogs", getAllBlogs);
router.get("/getBlogById/:id", getBlogById);
router.delete("/deleteBlog/:id", verifyToken, deleteBlog);

router.get("/getComments/:id", getComment);
router.post("/addComment/:id", addComment);
router.put("/updateComment/:blogId/:commentId", updateComment);
router.delete("/deleteComment/:blogId/:commentId", deleteComment);

module.exports = router;
