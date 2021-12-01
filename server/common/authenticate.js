const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

const authenticateAdmin = (req, res, next) => {
  if (req.user && req.user.designation === "ADMIN") {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  auth: authenticateToken,
  adminAuth: authenticateAdmin,
};
