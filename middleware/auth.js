const jwt = require("jsonwebtoken");
const { User } = require("../model");
exports.auth = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId).select("role");
      if (!user) {
        return res.status(400).send("User not exists!");
      }
      if (!roles.includes(user.role)) {
        return res.status(403).send("Access Denied!");
      }
    } catch (err) {
      return res.status(401).send(err.message);
    }
    return next();
  };
};
