const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN"
  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    req.userId = decoded.userId; // Add user data to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {verifyToken};
