const jwt = require("jsonwebtoken");
const db = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    // Check header have authorization
    if (!authorization || !authorization.startsWith("Bearer"))
      return res.status(401).json({ message: "You are unauthenticated" });

    // Check if empty token
    const token = authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "You are unauthenticated" });

    // Verify with jwt.verify
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "secret_key");

    // Check existing of user
    const user = await db.User.findOne({ where: { id: payload.userId }, raw: true });
    if (!user) return res.status(401).json({ message: "You are unauthenticated" });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
