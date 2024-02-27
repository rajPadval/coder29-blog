const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || "";
  if (!token || token === "") {
    return res.status(401).json({ success: false, message: "Access Denied" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Token" });
      } else {
        req.id = decoded.id;
      }
    });
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = verifyToken;
