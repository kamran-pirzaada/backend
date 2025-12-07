import express from "express";
const router = express.Router();

router.get("/test-env", (req, res) => {
  res.json({ uri: process.env.MONGODB_URL || "MONGODB_URL not found" });
});

export default router;
