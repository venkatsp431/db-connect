import jwt from "jsonwebtoken";

export async function isAuthenticated(req, res, next) {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(400).json({ data: "Invalid Authorization" });
  }
  jwt.verify(token, process.env.SECRETKEY);
  next();
}
