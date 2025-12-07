import express from "express";
const router = express.Router();

router.get("/test-env", (req, res) => {
  res.json({ uri: process.env.MONGODB_URL });
});

export default router;
