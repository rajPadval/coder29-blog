const { signup, login, logout, checkAuth } = require("./contollers/AuthController");
const verifyToken = require("./middlewares/verifyToken");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", verifyToken, checkAuth);

module.exports = router;
