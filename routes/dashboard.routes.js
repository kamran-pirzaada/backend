// //dashboard.routes.js

// import authMiddleware from "../middleware/auth.js";

// router.get("/dashboard-data", authMiddleware, async (req, res) => {
//   // sirf authorized users ke liye data send
//   res.json({ data: "This is protected data" });
// });














// routes/dashboard.routes.js
import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Protected dashboard route
router.get("/dashboard-data", authMiddleware, async (req, res) => {
  try {
    // Sirf authorized users ke liye data
    const authResult = await authMiddleware(req, res);
    if (authResult === false) return; // unauthorized handled inside middleware

    res.status(200).json({ data: "This is protected data" });
  } catch (err) {
    console.error("Dashboard route error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
