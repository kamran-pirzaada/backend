// // middleware/auth.js
// import jwt from "jsonwebtoken";
// const JWT_SECRET = process.env.JWT_SECRET;

// export default function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // user info attach
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// }










// middleware/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    // "Bearer token" format
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
