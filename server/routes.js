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
  addComment,
} = require("./contollers/BlogController");
const verifyToken = require("./middlewares/verifyToken");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", verifyToken, checkAuth);

router.post("/createBlog", verifyToken, createBlog);
router.get("/allBlogs", getAllBlogs);
router.get("/getBlogById/:id", getBlogById);
router.post("/addComment/:id", addComment);

module.exports = router;
